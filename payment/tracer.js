"use strict";

const opentelemetry = require("@opentelemetry/sdk-node");
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } = require("@opentelemetry/tracing");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')


const hostName = process.env.OTEL_TRACE_HOST || 'localhost'

// slightly adapted example from https://logz.io/blog/nodejs-javascript-opentelemetry-auto-instrumentation/#tracer 

const exporter = new JaegerExporter({
  tags: [],
  endpoint: `http://${hostName}:14268/api/traces`,
});

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      "PAYMMENT-SERVICE",
  }),
});
// export spans to console (useful for debugging)
provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));
// export spans to opentelemetry collector
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register();
const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations(), new ExpressInstrumentation(), new HttpInstrumentation()],
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error));

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
"use strict";

const opentelemetry = require("@opentelemetry/sdk-node");
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor, } = require("@opentelemetry/tracing");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

// slightly adapted example from https://logz.io/blog/nodejs-javascript-opentelemetry-auto-instrumentation/#tracer 

const exporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces"
});

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      "PAYMMENT-SERVICE",
  }),
});
// export spans to console (useful for debugging)
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
// export spans to opentelemetry collector
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register();
const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()
  .then(() => {
    console.log("Tracing initialized");
  })
  .catch((error) => console.log("Error initializing tracing", error));

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});
# opentelemetry_jaeger_showcase_dev

## Used technologies
Microservices:
- javaScript (nodeJs + express)
- python (Flask & django)
Deployment:
- docker
- kubernetes
Monitoring:
- openTelemetry 
- Jaeger

## Research

Options for instrumentation with openTelemetry:
A) Manual instrumentation (https://opentelemetry.io/docs/instrumentation/python/manual/)
B) Auto-instrumentation (https://opentelemetry.io/docs/instrumentation/python/automatic/)
C) Auto-instrumentation vìa kubernetes operators (https://github.com/open-telemetry/opentelemetry-operator)

Options for Jaeger deployment:
A) Kubernetes operator (https://www.jaegertracing.io/docs/1.41/operator/)
B) Kubernetes service (https://github.com/jaegertracing/jaeger-kubernetes)

Options for communication openTelemetry -> Jaeger:
- OTLP exporter -> Jaeger (https://www.aspecto.io/blog/distributed-tracing-with-opentelemetry-collector-on-kubernetes/)
- Jaeger exporter -> Jaeger (https://github.com/angudadevops/jaeger-k8s/blob/master/python/app/app.py)
- OTLP exporter -> Jaeger collector -> Jaeger (https://medium.com/@akashjoffical08/implement-distributed-tracing-with-jaeger-opentelemetry-on-kubernetes-3e35cb77b536)


## Architecture




## Azure set up

### Requirements:
- Auzre CLI

### Setup

```bash
az login
az aks install-cli
az group create  --location westeurope -n clc_proj
az aks create -g clc_proj -n clc_cluster --node-count 1
az aks get-credentials --resource-group clc_proj --name clc_cluster
kubectl get nodes

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml
kubectl create namespace observability
kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.41.0/jaeger-operator.yaml -n observability
```

docker run --name jaeger -d -p 16686:16686 -p 4317:4317 -p 4318:4318 -e COLLECTOR_OTLP_ENABLED=true jaegertracing/all-in-one:latest

### Cleanup

```
az group delete --name clc_proj --yes
```



## Lessons learned
- Don't expect open source documentation to be up to date!
- Implementation changes quickly and does not necessarily needs to be mentioned in release notes!
- Don't expect open source documentation to exist!
- Ports never match their documentation!
- Jaeger bases everything on environment variables!
- Create and delete of Azure resource groups take a long time => Use local kubernetes when trying to get the config right!
- AKS on Azure is free!
- Console logs in the Azure portal do not contain a lot of information (cropped stack traces)!
- Kubernetes operator for OpenTelemetry and Jaeger exist but the opinions vary which one is best-practice
- Getting OpenTelemetry ingest running is way easier in Dynatrace!
- Having a dedicated team for infrastucture / cloud management sounds nice!



https://www.youtube.com/watch?v=FK0uh-7nDSg
https://www.youtube.com/watch?v=oe5YYh9mhzw
https://docs.dapr.io/operations/monitoring/tracing/jaeger/
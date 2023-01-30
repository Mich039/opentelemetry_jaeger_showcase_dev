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
- Manual instrumentation (https://opentelemetry.io/docs/instrumentation/python/manual/)
- Auto-instrumentation (https://opentelemetry.io/docs/instrumentation/python/automatic/)
- Auto-instrumentation vìa kubernetes operators (https://github.com/open-telemetry/opentelemetry-operator)

Options for Jaeger deployment:
- Kubernetes operator (https://www.jaegertracing.io/docs/1.41/operator/)
- Kubernetes service (https://github.com/jaegertracing/jaeger-kubernetes)

Options for communication openTelemetry -> Jaeger:
- OTLP exporter -> Jaeger (https://www.aspecto.io/blog/distributed-tracing-with-opentelemetry-collector-on-kubernetes/)
- Jaeger exporter -> Jaeger (https://github.com/angudadevops/jaeger-k8s/blob/master/python/app/app.py)
- OTLP exporter -> Jaeger collector -> Jaeger (https://medium.com/@akashjoffical08/implement-distributed-tracing-with-jaeger-opentelemetry-on-kubernetes-3e35cb77b536)


## Architecture
![download](https://user-images.githubusercontent.com/20288604/211396297-c386a1ba-fd8e-4f87-b9cb-e57649ad171b.png)

## Original plan: Azure set up

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

<... did not work ...>

### Cleanup

```
az group delete --name clc_proj --yes
```

## Alternative tutorials tried (we could not replicate a single one even though the newest is from January 2023)

https://www.youtube.com/watch?v=FK0uh-7nDSg

https://www.youtube.com/watch?v=oe5YYh9mhzw

https://docs.dapr.io/operations/monitoring/tracing/jaeger/


## Alternative showcase 

=> everything in one docker container since the ports never matched

```
docker compose up
```

=> Navigate to http://localhost:16686 for the jaeger ui

=> Invoke REST api using postman (auto-instrumentation is not working due to known issues with fetch e.g. https://github.com/Effect-TS/effect/issues/1031 and linked issues in thread )

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




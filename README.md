# opentelemetry_jaeger_showcase_dev

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

https://www.youtube.com/watch?v=FK0uh-7nDSg
https://www.youtube.com/watch?v=oe5YYh9mhzw
https://docs.dapr.io/operations/monitoring/tracing/jaeger/
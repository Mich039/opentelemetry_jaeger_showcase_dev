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
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

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


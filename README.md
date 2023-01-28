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
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

### Cleanup

```
az group delete --name clc_proj --yes
```
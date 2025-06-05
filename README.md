# ORPC Angular Example Repository Issue

## Issue Description

This repository demonstrates an issue with the ORPC (OpenRPC) service implementation in Angular, specifically regarding query options configuration.

## Current Working Implementation

```typescript
private _orpc = inject(ORPCService);

// Current working implementation
query = injectQuery(() => this._orpc.utils.healthCheck.queryOptions({
  queryFn: () => this._orpc.client.healthCheck(),
}));
```

## Issue

While the above implementation works, it requires an additional step to pass the `queryFn` to the `queryOptions`. This results in:
- More verbose code
- Reduced developer experience
- Additional boilerplate

## Expected Behavior

According to the documentation, it should be possible to use the `queryFn` directly in the `queryOptions` like this:

```typescript
// Expected implementation (currently not working)
query = injectQuery(() => this._orpc.utils.healthCheck.queryOptions());
```

## Problem

The simplified approach shown above is not working as expected, despite being documented as a valid usage pattern.

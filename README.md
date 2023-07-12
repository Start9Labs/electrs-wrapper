# Wrapper for Electrum Rust Server (electrs)

`electrs` is an efficient re-implementation of Electrum Server written in Rust. This wrapper allows electrs to integrate with other services on embassy-os and exposes its config in the embassy-os UI.

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [embassy-sdk](https://github.com/Start9Labs/embassy-os/blob/master/backend/install-sdk.sh)
- [make](https://www.gnu.org/software/make/)

## Cloning

```
git clone https://github.com/Start9Labs/electrs-wrapper.git
git submodule update --init
cd electrs-wrapper
```

## Building

```
make
```

See the [Develper Docs](https://docs.start9.com/latest/developer-docs/packaging) for more information.

## Sideload onto StartOS

Select `System > Sideload Service` from the web UI.

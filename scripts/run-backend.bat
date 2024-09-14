@echo off

@rem Run backend.
pushd .\backend
.\mvnw.cmd spring-boot:run
popd

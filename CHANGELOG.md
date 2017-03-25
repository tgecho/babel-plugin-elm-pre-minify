0.1.0 - 2017-03-25

- Add additional names to the pure function whitelist for additional dead code elimination
- Fix a bug that allowed pure function annotations to be added outside of the Elm scope


0.0.2 - 2017-03-23

- Allow dead code elimination to work on the debugSetup code path if Elm's --debug flag was not used


0.0.1 - 2017-03-22

- Initial release
- Annotate pure function calls
- Unwrap IIFEs to optimize dead code elimination

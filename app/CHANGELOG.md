# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Types of changes**:

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [Unreleased]

## [0.7.0] - 2021-04-11

### Changed

- Use webpack to build the app
- Display message revisions side-by-side
- Update reaction types
- Align this package version with the api

## [0.6.1]

### Added

- Receive a notification when a comments area request was moderated

### Changed

- Do not track page views on pages where the integration does not exist

## [0.6.0]

### Added

- Sentry integration
- Display the integration state in the popup
- Create comments area from the app

### Changed

- Replace GA with Matomo
- Debounce the loaders
- Moderation tabs
- Use snowpack to build the app

### Fixed

- Redirect to the login page after signup

## [0.5.1] - 2020-10-10

### Added

- List reported comments
- Ignore reported comments
- Delete reported comments
- Track unsubscribe events

### Fixed

- Redirect after authentication

## [0.5.0] - 2020-09-22

### Added

- Allow to search a user by nick
- Request to open new comments area
- New comments area requests moderation

### Removed

- Email authorization

## [0.4.4] - 2020-07-21

### Fixed

- Don't set the user requiring email validation

### Removed

- Remove tracking when the extension is not active
- Remove access to the localStorage

## [0.4.3] - 2020-07-11

### Added

- Place a border around the integration
- User email validation
- Track comment events

### Fixed

- Track with GA only

## [0.4.2] - 2020-06-14

### Added

- Tracking

## [0.4.1] - 2020-06-14

### Fixed

- Avatars path
- Replies count calculation
- Logo color

## [0.4.0] - 2020-06-13

### Added

- This changelog

# WebdriverIO + TypeScript + Cucumber Setup

This project demonstrates UI automation for some basic RudderStack flows using WebdriverIO, TypeScript, and Cucumber. It is configured to run tests locally and also through GitHub Actions on a schedule.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/shubh018/rudderFlows.git
cd WebdriverIO
npm ci
```

## Running Tests Locally

Make sure you have Google Chrome installed. Start the test run:

```bash
npx wdio run ./wdio.conf.ts
```

## GitHub Actions (CI)

A GitHub Actions workflow is set up in `.github/workflows/scheduled-tests.yml`. The workflow runs every night at 21:00 based on the cron expression in the YAML file.

Run all tests:

```bash
npx wdio run ./wdio.conf.ts
```

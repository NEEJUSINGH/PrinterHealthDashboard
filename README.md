# CS Lab Printer Health Dashboard

A simple dashboard for monitoring the health and cartridge usage of Computer Lab printers.

## Current Version

Version 1 is being developed for one printer:

Printer 01  
IP: 00.00.00.00

The dashboard currently displays:

- Printer health
- Toner level
- Lifetime print count
- Pages printed using the current cartridge
- Cartridge installation date
- Typical cartridge life
- Cartridge usage percentage
- Recent cartridge history

## Data Sources

The final dashboard will combine information from:

### Printer

The printer can potentially provide information such as:

- Printer status
- Toner level
- Lifetime page count
- Printer errors

### Google Sheets

Staff currently maintain information about:

- Cartridge installation dates
- Cartridge replacement history
- Lifetime print count when a cartridge is installed

## Cartridge Usage Calculation

Pages printed using the current cartridge:

Current lifetime print count
-
Lifetime print count when cartridge was installed

Example:

25,615 - 24,380 = 1,235 pages

## Current Development Stage

The dashboard currently uses sample data.

Future versions will connect the dashboard to real printer and Google Sheet data.

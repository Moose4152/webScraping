import { requireLogin } from './auth.js';
requireLogin();

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i]);
    return obj;
  });
}

async function loadCountries() {
  const res = await fetch('countries.csv');
  const csv = await res.text();
  return parseCSV(csv);
}

function renderCountryOptions(countries) {
  const select = document.getElementById('countrySelect');
  select.innerHTML = '<option value="">Select a country</option>' +
    countries.map(c => `<option value="${c.Country}">${c.Country}</option>`).join('');
}

function renderCountryTable(country) {
  const tableContainer = document.getElementById('countryTableContainer');
  if (!country) {
    tableContainer.innerHTML = '';
    return;
  }
  tableContainer.innerHTML = `
    <table>
      <tr>
        <th>Population</th>
        <th>GDP</th>
        <th>Capital</th>
        <th>Currency</th>
        <th>Fiscal Deficit</th>
        <th>Army Personnel</th>
        <th>Olympic Medals (Last)</th>
      </tr>
      <tr>
        <td>${country.Population}</td>
        <td>${country.GDP}</td>
        <td>${country.Capital}</td>
        <td>${country.Currency}</td>
        <td>${country.FiscalDeficit}</td>
        <td>${country.ArmyPersonnel}</td>
        <td>${country.OlympicMedals}</td>
      </tr>
    </table>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {
  const countries = await loadCountries();
  renderCountryOptions(countries);
  const select = document.getElementById('countrySelect');
  select.addEventListener('change', function() {
    const country = countries.find(c => c.Country === this.value);
    renderCountryTable(country);
  });
}); 
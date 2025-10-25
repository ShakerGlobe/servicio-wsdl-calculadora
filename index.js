const express = require("express");
const fs = require("fs");
const path = require("path");
const soap = require("soap");

const app = express();
const PORT = process.env.PORT || 3000;

// Cargar WSDL desde archivo
const wsdlPath = path.join(__dirname, "wsdl", "servicio.wsdl");
const wsdlXml = fs.readFileSync(wsdlPath, "utf8");

// Implementación del servicio (los nombres deben coincidir con el WSDL)
const calcService = {
  ServicioCalculadora: {
    CalculadoraPort: {
      Sumar({ a, b })        { return { resultado: Number(a) + Number(b) }; },
      Restar({ a, b })       { return { resultado: Number(a) - Number(b) }; },
      Multiplicar({ a, b })  { return { resultado: Number(a) * Number(b) }; },
      Dividir({ a, b }) {
        const nA = Number(a), nB = Number(b);
        if (nB === 0) return { resultado: NaN }; // válido para xsd:double
        return { resultado: nA / nB };
      }
    }
  }
};

// Montar servidor SOAP en /wsdl/calculadora
const soapEndpoint = "/wsdl/calculadora";
soap.listen(app, soapEndpoint, calcService, wsdlXml);

// Exponer el WSDL para verlo en el navegador (útil para evidencias)
app.get("/wsdl", (_req, res) => res.type("application/xml").send(wsdlXml));

// Página de inicio mínima
app.get("/", (_req, res) =>
  res.send(`<h3>Servicio Calculadora SOAP</h3>
  <p>WSDL: <a href="/wsdl">/wsdl</a></p>
  <p>Endpoint SOAP: <code>${soapEndpoint}</code></p>`));

app.listen(PORT, () => console.log(`Calculadora SOAP escuchando en puerto ${PORT}`));

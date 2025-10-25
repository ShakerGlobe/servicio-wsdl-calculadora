# Servicio Calculadora SOAP (WSDL)

Servicio web **SOAP** basado en **WSDL** con cuatro operaciones:
**Sumar**, **Restar**, **Multiplicar** y **Dividir**.

- Contrato: `wsdl/servicio.wsdl` (estilo **document/literal**)
- Implementación: `index.js` (Node + Express + soap)
- Deploy sin instalar nada: **Render** (desde este repo)
- Cliente de pruebas: **Hoppscotch** (o Postman Web)

---

## Despliegue en Render (rápido)

1. Ve a https://render.com → New + → Web Service.
2. Conecta tu GitHub y selecciona este repo.
3. Configura:
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
4. Crea el servicio y espera la URL pública, por ejemplo:
   https://tu-dominio.onrender.com
5. Actualiza el WSDL:
   - Abre `wsdl/servicio.wsdl` en GitHub.
   - Reemplaza `RENDER_HOST` por tu URL (incluye https://):
     <soap:address location="https://tu-dominio.onrender.com/wsdl/calculadora"/>
   - Guarda (commit). Si hace falta, en Render haz Redeploy.

> Después del deploy, el WSDL queda visible en /wsdl.

---

## Endpoints (después del deploy)

- WSDL (contrato):  https://tu-dominio.onrender.com/wsdl
- Endpoint SOAP:    https://tu-dominio.onrender.com/wsdl/calculadora

---

## Probar con Hoppscotch / Postman Web

Método: POST
URL: https://tu-dominio.onrender.com/wsdl/calculadora
Header: Content-Type: text/xml; charset=utf-8
Namespace de los ejemplos: xmlns:cal="http://www.ejemplo.com/calculadora"

### 1) Sumar
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:cal="http://www.ejemplo.com/calculadora">
  <soapenv:Header/>
  <soapenv:Body>
    <cal:SumarRequest>
      <cal:a>10</cal:a>
      <cal:b>5</cal:b>
    </cal:SumarRequest>
  </soapenv:Body>
</soapenv:Envelope>

### 2) Restar
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:cal="http://www.ejemplo.com/calculadora">
  <soapenv:Header/>
  <soapenv:Body>
    <cal:RestarRequest>
      <cal:a>20</cal:a>
      <cal:b>8</cal:b>
    </cal:RestarRequest>
  </soapenv:Body>
</soapenv:Envelope>

### 3) Multiplicar
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:cal="http://www.ejemplo.com/calculadora">
  <soapenv:Header/>
  <soapenv:Body>
    <cal:MultiplicarRequest>
      <cal:a>6</cal:a>
      <cal:b>7</cal:b>
    </cal:MultiplicarRequest>
  </soapenv:Body>
</soapenv:Envelope>

### 4) Dividir (con manejo de división entre cero)
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:cal="http://www.ejemplo.com/calculadora">
  <soapenv:Header/>
  <soapenv:Body>
    <cal:DividirRequest>
      <cal:a>10</cal:a>
      <cal:b>0</cal:b>
    </cal:DividirRequest>
  </soapenv:Body>
</soapenv:Envelope>

*Para b=0 el servicio devuelve `<resultado>NaN</resultado>` (válido para xsd:double).*

---

## Evidencias para la entrega
- Captura del WSDL abierto en /wsdl.
- Capturas de request/response de las 4 operaciones.
- (Opcional) Captura de logs en Render mostrando peticiones.

---

## Trabajo en parejas
- Alumno A: contrato WSDL, repo y este README (deja `RENDER_HOST` en `soap:address`).
- Alumno B: deploy en Render, reemplazar `RENDER_HOST` por la URL pública, pruebas y capturas.

---

## Notas técnicas
- WSDL en document/literal para interoperabilidad.
- Nombres coherentes entre `portType` ↔ `messages` ↔ métodos en `index.js`.
- Namespace: `targetNamespace="http://www.ejemplo.com/calculadora"` y prefijo `tns` consistente.

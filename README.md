# Servicio Calculadora SOAP (WSDL)

Servicio web **SOAP** basado en **WSDL** con cuatro operaciones: **Sumar**, **Restar**, **Multiplicar** y **Dividir**.

- Contrato: `wsdl/servicio.wsdl` (estilo **document/literal**)
- Implementación: `index.js` (Node + Express + soap)
- Cliente de pruebas: **Hoppscotch** (o Postman Web)

---

## Endpoints (producción)

- **WSDL (contrato):**  
  `https://servicio-wsdl-calculadora.onrender.com/wsdl`

- **Endpoint SOAP (POST):**  
  `https://servicio-wsdl-calculadora.onrender.com/wsdl/calculadora`

---

## Probar con Hoppscotch / Postman Web

**Método:** `POST`  
**URL:** `https://servicio-wsdl-calculadora.onrender.com/wsdl/calculadora`  
**Header:** `Content-Type: text/xml; charset=utf-8`  
**Namespace de los ejemplos:** `xmlns:cal="http://www.ejemplo.com/calculadora"`

### 1) Sumar
~~~xml
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
~~~

### 2) Restar
~~~xml
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
~~~

### 3) Multiplicar
~~~xml
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
~~~

### 4) Dividir (con manejo de división entre cero)
~~~xml
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
~~~
*Nota:* para `b=0` el servicio devuelve `<resultado>NaN</resultado>` (válido para `xsd:double`).

---

## Despliegue (referencia)

1. Render → **New +** → **Web Service** → Conectar GitHub.  
2. **Build:** `npm install` — **Start:** `npm start`.  
3. Ver URL pública (termina en `onrender.com`).  
4. Verifica que en `wsdl/servicio.wsdl` la línea del endpoint sea:
~~~xml
<soap:address location="https://servicio-wsdl-calculadora.onrender.com/wsdl/calculadora"/>
~~~

---

## Evidencias recomendadas

- Captura del **WSDL** abierto en `/wsdl`.  
- Capturas de **request/response** de las 4 operaciones.  
- (Opcional) Captura de logs en Render.

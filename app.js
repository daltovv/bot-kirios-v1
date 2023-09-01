
const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { Client } = require('pg')


const flujoKinet= addKeyword("4")
    .addAnswer("*Sistema de Gestion Empresarial y Facturación* \n*Firma Electronica* \nContactate con un Asesor \nhttps://wa.link/g8qt1c")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })
 
const flujoSoporte = addKeyword("2")
    .addAnswer('Contactate con un Asesor \n*Consulta* al siguiente número: \nhttps://wa.link/7bdowi \n\nIngresa: \n*Número de orden* \n*Número de cedula*')
    .addAnswer("*0* - Menú principal",{
        delay:1500
    })
   
const flujoMarketing = addKeyword("3")
    .addAnswer("- Manejo de Redes Sociales \n- Manual de Marca \n- Coberturas \n- Creación de Artes y Videos \n*Contactate con un asesor:* \nhttps://wa.link/xpn4ce")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

const flujoVentas = addKeyword("1")
    .addAnswer("Compra en nuestra Tienda Virtual \nhttps://kinetshop.com/ \n¡Compra hoy, Recibe hoy!")
    .addAnswer("Contactate con un Asesor \nhttps://wa.link/lkvxrn")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

const flujoRedes = addKeyword("6")
    .addAnswer("*Estas son nuestras redes sociales*: 📡\n*Instagram*:\n\thttps://www.instagram.com/kiriosnet/?hl=es\n*Facebook*:\n\thttps://www.facebook.com/kiriosnet/?locale=es_LA\n*LinkedIn:*\n\thttps://ec.linkedin.com/company/kiriosnet\n*TikTok*\n\thttps://www.tiktok.com/@kirios.ec")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

const FlujoCont = addKeyword("5")
    .addAnswer("Deptartamento Contable - Financiero \nContactanos: https://wa.link/3obet4")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

const flujoSalir = addKeyword("7")
    .addAnswer("Gracias por contactarte con *Kiri*, Recuerda que estamos para servirte. *¡Hasta pronto!* 👋",
    null, async(ctx, {endFlow}) =>{
        setTimeout(() => {
            console.log("Cerrando el chatbot automáticamente...")
            process.exit(0)
        }, 1 * 60 * 1000)
        return endFlow({ body: "el bot se cerrara en 1 min.... 👋"})
    })


const flujoCero = addKeyword("0")
    .addAnswer("*Menú Principal*\nSeleccione un número:\n\t*1* - Ventas 🛒\n\t*2* - Soporte Técnico ⚙️\n\t*3* - KinetBrand 🤩\n\t*4* - KinetPos 👨‍💻\n\t*5* - Contabilidad 📈 \n\t*6* - Nuestras Redes 📱 \n\t*7* - Salir 🫡")

const flujoSaludo = addKeyword(EVENTS.WELCOME)
    .addAnswer('\t*¡Bienvenid@ a KIRIOS!* 👋\n_Somos Soluciones_ 💡\nHola soy *Kiri*, el asistente virtual de Kirios 🤖 \nEn que puedo servirte:\n\t*1* - Ventas 🛒\n\t*2* - Soporte Técnico ⚙️\n\t*3* - KinetBrand 🤩\n\t*4* - KinetPos 👨‍💻\n\t*5* - Contabilidad 📈 \n\t*6* - Nuestras Redes 📱\n\t*7* - Salir 🫡', {
    }, 
    null, 
    [flujoVentas, flujoKinet, flujoSoporte, flujoMarketing, flujoRedes, flujoSalir, FlujoCont, flujoCero])
       
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoSaludo, flujoCero, flujoVentas, flujoKinet, flujoSoporte, flujoMarketing, flujoRedes, flujoSalir, FlujoCont])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()

    setTimeout(() => {
        console.log("Cerrando el chatbot automáticamente...");
        process.exit(0)
    }, 10 * 60 * 1000)
  
    
}

main()
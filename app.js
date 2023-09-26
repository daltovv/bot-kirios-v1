
const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { Client } = require('pg')

const flujoNumKinet= addKeyword("1")
    .addAnswer('\nContactate con un Asesor \nhttps://wa.link/g8qt1c')
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

    const flujoKinet= addKeyword("4")
    .addAnswer('Bienvenido al menu de *KinetPos* 👨‍💻')
    .addAnswer("Te ayudamos en: *- Sistema de Gestion Empresarial y Facturación* \n*- Firma Electronica* \n\n*1 - Contacto Asesor*")
    .addAnswer("*0* - Menú principal",{

    }, null, [flujoNumKinet])



const FlujoNumSoporte = addKeyword("1")
    .addAnswer('*Consulta* al siguiente número: \nhttps://wa.link/7bdowi')
    .addAnswer('Ingresa: \n*Número de orden* \n*Número de cedula*')
    .addAnswer("*0* - Menú principal",{
        delay:1500
    })

    const flujoSoporte = addKeyword("2")
    .addAnswer('Bienvenido al menu de *Soporte Tecnico* ⚙️')
    .addAnswer('*Horarios:* \n9am a 1pm \n3pm a 7pm \n\n*1* - Contactate con un Asesor')
    .addAnswer("*0* - Menú principal",{

    }, null, [FlujoNumSoporte])


const flujoNumBrand = addKeyword("1")
    .addAnswer('*Contacto asesor:* \nhttps://wa.link/antisn')
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })
   
    const flujoBrand = addKeyword("3")
    .addAnswer('Bienvenido al menu de *Kinet Brand* 🤩')
    .addAnswer("Expertos en: \n- Manejo de Redes Sociales \n- Manual de Marca \n- Coberturas \n- Creación de Artes y Videos \n\n*1 - Contactate con un Asesor*")
    .addAnswer("*0* - Menú principal", {

    }, null, [flujoNumBrand])


const FlujoNumVentas = addKeyword("1")
    .addAnswer("Contáctate con un Asesor \nhttps://wa.link/lkvxrn")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

    const flujoVentas = addKeyword("1")
    .addAnswer("Bienvenido al menú de *Ventas* 🛒 \n*Tienda* en Línea \nhttps://kinetshop.com/  \n\n*1* - Contacto Asesor \n\n\t       ¡Compra hoy, Recibe hoy!")
    .addAnswer("*0* - Menú principal",{

    }, null, [FlujoNumVentas])
 

const flujoRedes = addKeyword("6")
    .addAnswer("*Estas son nuestras redes sociales*: 📡\n*Instagram*:\n\thttps://www.instagram.com/kiriosnet/?hl=es\n*Facebook*:\n\thttps://www.facebook.com/kiriosnet/?locale=es_LA\n*LinkedIn:*\n\thttps://ec.linkedin.com/company/kiriosnet\n*TikTok*\n\thttps://www.tiktok.com/@kirios.ec")
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

const FlujoNumCont = addKeyword("1")
    .addAnswer('Contactanos: https://wa.link/3obet4')
    .addAnswer("*0* - Menú principal", {
        delay: 1500
    })

    const FlujoCont = addKeyword("5")
    .addAnswer('Bienvenido al menu de *Contabilidad* 📈')
    .addAnswer("Departamento Contable y Financiero \n\n*1* - Contactate con un Asesor")
    .addAnswer("*0* - Menú principal", {

    }, null, [FlujoNumCont])


const flujoSalir = addKeyword("7")
.addAnswer("Gracias por contactarte con *Kiri*, Recuerda que estamos para servirte.",
null, async(ctx, {endFlow}) =>{
    return endFlow({body: "*¡Hasta pronto!* 👋"})
})


const flujoError = addKeyword("[^1-7]")
    .addAnswer("Numero Invalido, ingrese un numero del *1* al *7*")

const flujoCero = addKeyword("0")
    .addAnswer("*Menú Principal*\nSeleccione un número:\n\t*1* - Ventas 🛒\n\t*2* - Soporte Técnico ⚙️\n\t*3* - KinetBrand 🤩\n\t*4* - KinetPos 👨‍💻\n\t*5* - Contabilidad 📈 \n\t*6* - Nuestras Redes 📱 \n\t*7* - Salir 🫡")

const flujoSaludo = addKeyword(EVENTS.WELCOME)
    .addAnswer('\t*¡Bienvenid@ a KIRIOS!* 👋\n_Somos Soluciones_ 💡\nHola soy *Kiri*, el asistente virtual de Kirios 🤖 \nEn que puedo servirte:\n\t*1* - Ventas 🛒\n\t*2* - Soporte Técnico ⚙️\n\t*3* - KinetBrand 🤩\n\t*4* - KinetPos 👨‍💻\n\t*5* - Contabilidad 📈 \n\t*6* - Nuestras Redes 📱\n\t*7* - Salir 🫡', {
    }, 
    null, 
    [flujoVentas, flujoKinet, flujoSoporte, flujoBrand, flujoRedes, flujoSalir, FlujoCont, flujoError])
  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoSaludo, flujoSoporte, flujoVentas, flujoBrand])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
        globalState: {
        encendido: true,
        }
      }
    )

    QRPortalWeb()

}

main()
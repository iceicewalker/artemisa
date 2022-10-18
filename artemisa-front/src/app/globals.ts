// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  rangos: any = [
    {id: 0, name: "Sin rango"},
    {id: 1, name: "Administrador"},
    {id: 2, name: "Empleado"},
  ]
  NAVLIST = [
      //{"link": "tsheets", "name": "Tsheets", "icon": "time-outline", "sublinks": [], "rank": []},
      {"link": "dashboard", "name": "Dashboard", "icon": "stats-chart", "sublinks": [], "rank": [1]},
      {"link": "customer", "name": "Clientes", "icon": "people-outline", "sublinks": [
        {"link": "add-customer", "name": "Ingresar Cliente", "icon": "add-outline", "rank": [1, 2]},
        {"link": "customers", "name": "Administrar Clientes", "icon": "id-card-outline", "rank": [1, 2]},
      ], "rank": [1, 2]},
      {"link": "category", "name": "Categorías", "icon": "pricetag-outline", "sublinks": [
        {"link": "add-category", "name": "Ingresar Categoría", "icon": "add-outline", "rank": [1]},
        {"link": "categories", "name": "Administrar Categorías", "icon": "pricetags-outline", "rank": [1]},
      ], "rank": [1]},
      {"link": "inventoryx", "name": "Inventario", "icon": "cube-outline", "sublinks": [
        {"link": "add-inventory", "name": "Ingresar Inventario", "icon": "add-outline", "rank": [1, 2]},
        {"link": "inventory", "name": "Administrar Inventario", "icon": "albums-outline", "rank": [1, 2]},
      ], "rank": [1, 2]},
      {"link": "order", "name": "Pedidos", "icon": "bag-check-outline", "sublinks": [
        {"link": "add-order", "name": "Ingresar Pedido", "icon": "add-outline", "rank": [1, 2]},
        {"link": "orders", "name": "Administrar Pedidos", "icon": "bag-outline", "rank": [1, 2]},
      ], "rank": [1, 2]},
      {"link": "employee", "name": "Empleados", "icon": "person-outline", "sublinks": [
        {"link": "add-employee", "name": "Ingresar Empleado", "icon": "add-outline", "rank": [1]},
        {"link": "employees", "name": "Administrar Empleados", "icon": "id-card-outline", "rank": [1]},
      ], "rank": [1]},
      {"link": "signOut", "name": "Cerrar Sesión", "icon": "log-out-outline", "sublinks": [], "rank": []},
    ];
    authErrors: any = { "admin-restricted-operation": "Esta operación está restringida únicamente a los administradores.", "argument-error": "", "app-not-authorized": "Esta aplicación, identificada por el dominio donde está alojada, no está autorizada a usar la autenticación firebase con la clave de API proporcionada. Revisa la configuración de tu clave en la consola de la API de Google.", "app-not-installed": "La aplicación móvil solicitada correspondiente al identificador (nombre del paquete de Android o ID de paquete de iOS) proporcionada no está instalada en este dispositivo.", "captcha-check-failed": "El token de respuesta reCAPTCHA proporcionado no es válido, ha caducado, ya se ha utilizado o el dominio asociado a él no coincide con la lista de dominios de la lista blanca.", "code-expired": "El código SMS ha caducado. Vuelva a enviar el código de verificación para intentarlo de nuevo.", "cordova-not-ready": "Cordova marco no está listo.", "cors-unsupported": "Este explorador no es compatible.", "credential-already-in-use": "Esta credencial ya está asociada a una cuenta de usuario diferente.", "custom-token-mismatch": "El token personalizado corresponde a una audiencia diferente.", "requires-recent-login": "Esta operación es confidencial y requiere autenticación reciente. Inicie sesión de nuevo antes de volver a intentar esta solicitud.", "dynamic-link-not-activated": "Active los Enlaces dinámicos en la consola de Firebase y acepte los términos y condiciones.", "email-change-needs-verification": "Los usuarios multifactor siempre deben tener un correo electrónico verificado.", "email-already-in-use": "La dirección de correo electrónico ya está en uso por otra cuenta.", "expired-action-code": "El código de acción ha caducado. ", "cancelled-popup-request": "Esta operación se ha cancelado debido a que se abre otro elemento emergente en conflicto.", "internal-error": "Se ha producido un error interno.", "invalid-app-credential": "La solicitud de verificación telefónica contiene un verificador de aplicación no válido. La respuesta del token reCAPTCHA no es válida o ha caducado.", "invalid-app-id": "El identificador de la aplicación móvil no se aplica al proyecto actual.", "invalid-user-token": "La credencial de este usuario no es válida para este proyecto. Esto puede ocurrir si el token del usuario ha sido manipulado o si el usuario no está para el proyecto asociado a esta clave de API.", "invalid-auth-event": "Se ha producido un error interno.", "invalid-verification-code": "El código de verificación de SMS utilizado para crear la credencial de autenticación del teléfono no es válido. Por favor, vuelva a enviar el código de verificación sms y asegúrese de utilizar el código de verificación proporcionado por el usuario.", "invalid-continue-uri": "La dirección URL de continuar proporcionada en la solicitud no es válida.", "invalid-cordova-configuration": "Los siguientes complementos de Cordova deben instalarse para habilitar el inicio de sesión de OAuth: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser y cordova-plugin-customurlscheme.", "invalid-custom-token": "El formato de token personalizado es incorrecto. Por favor, consulte la documentación.", "invalid-dynamic-link-domain": "El dominio de vínculo dinámico proporcionado no está configurado ni autorizado para el proyecto actual.", "invalid-email": "La dirección de correo electrónico está mal formateada.", "invalid-api-key": "Su clave de API no es válida, compruebe que la ha copiado correctamente.", "invalid-cert-hash": "El hash de certificado SHA-1 proporcionado no es válido.", "invalid-credential": "La credencial de autenticación proporcionada tiene un formato incorrecto o ha caducado.", "invalid-message-payload": "La plantilla de correo electrónico correspondiente a esta acción contiene caracteres no válidos en su mensaje. Por favor, arregle yendo a la sección de plantillas de correo electrónico de autenticación en la consola de Firebase.", "invalid-multi-factor-session": "La solicitud no contiene una prueba válida del primer factor de inicio de sesión correcto.", "invalid-oauth-provider": "EmailAuthProvider no se admite para esta operación. Esta operación solo admite proveedores de OAuth.This operation only supports OAuth providers.", "invalid-oauth-client-id": "El ID de cliente de OAuth proporcionado no es válido o no coincide con la clave de API especificada.", "unauthorized-domain": "Este dominio no está autorizado para las operaciones de OAuth para su proyecto de Firebase. Edite la lista de dominios autorizados desde la consola de Firebase.", "invalid-action-code": "El código de acción no es válido. Esto puede ocurrir si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado.", "wrong-password": "La contraseña no es válida o el usuario no tiene una contraseña.", "invalid-persistence-type": "El tipo de persistencia especificado no es válido. Solo puede ser local, de sesión o ninguno.", "invalid-phone-number": "El formato del número de teléfono proporcionado es incorrecto. Introduzca el número de teléfono en un formato que se pueda analizar en formato E.164. Los números de teléfono E.164 están escritos en el formato [+][código de país][número de suscriptor incluyendo código de área].", "invalid-provider-id": "El identificador de proveedor especificado no es válido.", "invalid-recipient-email": "El correo electrónico correspondiente a esta acción no se pudo enviar ya que la dirección de correo electrónico del destinatario proporcionada no es válido.", "invalid-sender": "La plantilla de correo electrónico correspondiente a esta acción contiene un nombre o correo electrónico de remitente no válido. Por favor, arregle yendo a la sección de plantillas de correo electrónico de autenticación en la consola de Firebase.", "invalid-verification-id": "El ID de verificación usado para crear la credencial del auth del teléfono es inválido.", "invalid-tenant-id": "El identificador de inquilino de la instancia de autenticación no es válido.", "multi-factor-info-not-found": "El usuario no tiene un segundo factor que coincida con el identificador proporcionado.", "multi-factor-auth-required": "Se requiere una prueba de propiedad de un segundo factor para completar el inicio de sesión.", "missing-android-pkg-name": "Se debe proporcionar un nombre de paquete de Android si se requiere instalar la aplicación de Android.", "auth-domain-config-required": "Asegúrese de incluir authDomain al llamar a firebase.initializeApp(), siguiendo las instrucciones de la consola de Firebase.", "missing-app-credential": "A la solicitud de verificación telefónica le falta una aserción de verificador de aplicación. Es necesario proporcionar un token de respuesta reCAPTCHA.", "missing-verification-code": "La credencial de autenticación del teléfono se creó con un código de verificación sms vacío.", "missing-continue-uri": "Se debe proporcionar una dirección URL de continuar en la solicitud.", "missing-iframe-start": "Se ha producido un error interno.", "missing-ios-bundle-id": "Se debe proporcionar un ID de paquete de iOS si se proporciona un ID de App Store.", "missing-multi-factor-info": "No se proporciona ningún segundo identificador de factor.", "missing-multi-factor-session": "A la solicitud le falta la prueba del primer inicio de sesión correcto del factor.", "missing-or-invalid-nonce": "La solicitud no contiene un nonce válido. Esto puede ocurrir si el hash SHA-256 del nonce sin procesar proporcionado no coincide con el nonce hash en la carga del token de ID.", "missing-phone-number": "Para enviar códigos de verificación, proporcione un número de teléfono para el destinatario.", "missing-verification-id": "La credencial de autenticación del teléfono se creó con un identificador de verificación vacío.", "app-deleted": "Esta instancia de FirebaseApp se ha eliminado.", "account-exists-with-different-credential": "Ya existe una cuenta con la misma dirección de correo electrónico pero credenciales de inicio de sesión diferentes. Inicie sesión con un proveedor asociado a esta dirección de correo electrónico.", "network-request-failed": "Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inalcanzable).", "no-auth-event": "Se ha producido un error interno.", "no-such-provider": "El usuario no estaba vinculado a una cuenta con el proveedor dado.", "null-user": "Se proporcionó un objeto de usuario null como argumento para una operación que requiere un objeto de usuario no nulo.", "operation-not-allowed": "El proveedor de inicio de sesión dado está deshabilitado para este proyecto de Firebase. Habilítelo en la consola de Firebase, en la pestaña método de inicio de sesión de la sección Autenticación.", "operation-not-supported-in-this-environment": "Esta operación no se admite en el entorno en el que se ejecuta esta aplicación.", "popup-blocked": "No se puede establecer una conexión con la ventana emergente. Puede haber sido bloqueado por el navegador.", "popup-closed-by-user": "El usuario ha cerrado la ventana emergente antes de finalizar la operación.", "provider-already-linked": "El usuario solo se puede vincular a una identidad para el proveedor determinado.", "quota-exceeded": "Se ha superado la cuota del proyecto para esta operación.", "redirect-cancelled-by-user": "La operación de redirección ha sido cancelada por el usuario antes de finalizar.", "redirect-operation-pending": "Ya está pendiente una operación de inicio de sesión de redirección.", "rejected-credential": "La solicitud contiene credenciales con formato incorrecto o que no coinciden.", "second-factor-already-in-use": "El segundo factor ya está inscrito en esta cuenta.", "maximum-second-factor-count-exceeded": "Se ha superado el número máximo permitido de segundos factores en un usuario.", "tenant-id-mismatch": "El identificador de inquilino proporcionado no coincide con el identificador de inquilino de la instancia de autenticación", "timeout": "Se ha aestado el tiempo de ejecución de la operación.", "user-token-expired": "La credencial del usuario ya no es válida. El usuario debe iniciar sesión de nuevo.", "too-many-requests": "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Inténtelo de nuevo más tarde.", "unauthorized-continue-uri": "El dominio de la dirección URL de continuar no está en la lista blanca.  Por favor, incluya el dominio en la lista blanca en la consola de Firebase.", "unsupported-first-factor": "Inscribir un segundo factor o iniciar sesión con una cuenta multifactor requiere iniciar sesión con un primer factor admitido.", "unsupported-persistence-type": "El entorno actual no admite el tipo de persistencia especificado.", "unsupported-tenant-operation": "Esta operación no se admite en un contexto multiinquilino.", "unverified-email": "La operación requiere un correo electrónico verificado.", "user-cancelled": "El usuario no concedió a la aplicación los permisos que solicitó.", "user-not-found": "No hay ningún registro de usuario correspondiente a este identificador.", "user-disabled": "Un administrador ha deshabilitado la cuenta de usuario.", "user-mismatch": "Las credenciales proporcionadas no corresponden al usuario que ha iniciado sesión anteriormente.", "user-signed-out": "", "weak-password": "La contraseña debe tener 6 caracteres o más.", "web-storage-unsupported": "Este navegador no es compatible o las cookies y los datos de 3rd party pueden estar deshabilitados." }
    provincias = [{ "id": "Azuay", "datos": [ "Camilo Ponce Enríquez", "Chordeleg", "El Pan", "Girón", "Guachapala", "Gualaceo", "Nabón", "Oña  ", "Paute", "Pucará", "San Fernando", "Santa Isabel", "Sevilla de Oro", "Sígsig", "Cuenca" ] }, { "datos": [ "Guaranda", "Caluma", "Chillanes", "Chimbo", "Echeandía", "Las Naves", "San Miguel" ], "id": "Bolivar" }, { "id": "Carchi", "datos": [ "Tulcán", "Bolívar", "Espejo", "Mira", "Montúfar", "San Pedro de Huaca" ] }, { "datos": [ "Azogues", "Biblián", "Cañar", "Déleg", "El Tambo", "La Troncal", "Suscal" ], "id": "Cañar" }, { "datos": [ "Riobamba", "Alausí", "Chambo", "Chunchi", "Colta", "Cumandá", "Guamote", "Guano", "Pallatanga", "Penipe" ], "id": "Chimborazo" }, { "id": "Cotopaxi", "datos": [ "Latacunga", "La Maná", "Pangua", "Pujilí", "Salcedo", "Saquisilí", "Sigchos" ] }, { "datos": [ "Machala", "Arenillas", "Atahualpa", "Balsas", "Chilla", "El Guabo", "Huaquillas", "Las Lajas", "Marcabelí", "Pasaje", "Piñas", "Portovelo", "Santa Rosa", "Zaruma" ], "id": "El Oro" }, { "datos": [ "Esmeraldas", "Atacames", "Eloy Alfaro", "Muisne", "Quinindé", "Rioverde", "San Lorenzo" ], "id": "Esmeraldas" }, { "id": "Galápagos", "datos": [ "San Cristóbal", "Isabela", "Santa Cruz" ] }, { "id": "Guayas", "datos": [ "Guayaquil", "Alfredo Baquerizo Moreno", "Balao", "Balzar", "Colimes", " Daule", "Durán", "El Empalme", "El Triunfo", "General Antonio Elizalde", "Isidro Ayora", "Lomas de Sargentillo", "Marcelino Maridueña", "Milagro", "Naranjal", "Naranjito", "Nobol", "Palestina", "Pedro Carbo", "Playas", "Salitre", "Samborondón", "Santa Lucía", "Simón Bolívar", "Yaguachi" ] }, { "id": "Imbabura", "datos": [ "Ibarra", "Antonio Ante", "Cotacachi", "Otavalo", "Pimampiro", "San Miguel de Urcuquí" ] }, { "datos": [ "Loja", "Calvas", "Catamayo", "Celica", "Chaguarpamba", "Espíndola", "Gonzanamá", "Macará  ", "Olmedo", "Paltas", "Pindal  ", "Puyango", "Quilanga", "Saraguro", "Sozoranga", "Zapotillo" ], "id": "Loja" }, { "datos": [ "Babahoyo", "Baba", "Buena Fe", "Mocache", "Montalvo", "Palenque", "Puebloviejo", "Quevedo", "Quinsaloma", "Urdaneta", "Valencia", "Ventanas", "Vinces" ], "id": "Los Rios" }, { "id": "Manabi", "datos": [ "Portoviejo  ", "24 de Mayo", "Bolívar", "Chone", "El Carmen", "Flavio Alfaro", "Jama", "Jaramijó", "Jipijapa", "Junín", "Manta", "Montecristi", "Olmedo", "Paján", "Pedernales", "Pichincha", "Puerto López", "Rocafuerte", "San Vicente", "Santa Ana", "Sucre", "Tosagua" ] }, { "id": "Morona Santiago", "datos": [ "Morona", "Gualaquiza", "Huamboya", "Limón Indanza", "Logroño", "Pablo Sexto", "Palora", "San Juan Bosco", "Santiago de Méndez", "Sucúa", "Taisha", "Tiwintza" ] }, { "datos": [ "Tena", "Archidona", "Carlos Julio Arosemena Tola", "El Chaco", "Quijos" ], "id": "Napo" }, { "id": "Orellana", "datos": [ "Francisco de Orellana", "Aguarico", "La Joya de los Sachas", "Loreto" ] }, { "datos": [ "Pastaza", "Arajuno", "Mera", "Santa Clara" ], "id": "Pastaza" }, { "id": "Pichincha", "datos": [ "Quito", "Cayambe", "Mejía", "Pedro Moncayo", "Pedro Vicente Maldonado", "Puerto Quito", "Rumiñahui  ", "San Miguel de los Bancos" ] }, { "datos": [ "Santa Elena", "La Libertad", "Salinas" ], "id": "Santa Elena" }, { "datos": [ "Santo Domingo", "La Concordia" ], "id": "Santo Domingo De Los Tsachilas" }, { "id": "Sucumbios", "datos": [ "Lago Agrio", "Cascales", "Cuyabeno", "Gonzalo Pizarro", "Putumayo", "Shushufindi", "Sucumbíos" ] }, { "datos": [ "Ambato", "Baños", "Cevallos", "Mocha", "Patate", "Pelileo", "Quero", "Santiago de Píllaro", "Tisaleo" ], "id": "Tungurahua" }, { "id": "Zamora Chinchipe", "datos": [ "Zamora", "Centinela del Cóndor", "Chinchipe", "El Pangui", "Nangaritza", "Palanda", "Paquisha", "Yacuambi", "Yantzaza" ] } ];
}
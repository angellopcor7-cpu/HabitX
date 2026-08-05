/* =====================================
   HABITX
   FIREBASE CLOUD MESSAGING
===================================== */

const VAPID_KEY =
"BG3Kog_sqa76UbMqawLqaf6QWB1SEyarsn2XPhbIUe8NbpCPKKsB5RbGrBEAPGJQDZcGE_70-wfRVhVEh5o-v_Y";

async function iniciarFirebaseNotifications(){

    try{

        const permiso =
        await Notification.requestPermission();

        if(permiso !== "granted"){

            console.log("❌ Permiso denegado");

            return;

        }

        const registroSW =
        await navigator.serviceWorker.ready;

        const token =
        await messaging.getToken({

            vapidKey:
            VAPID_KEY,

            serviceWorkerRegistration:
            registroSW

        });

        if(token){

            console.log("✅ TOKEN FCM:");

            console.log(token);

        }else{

            console.log(
                "❌ No se pudo obtener el token."
            );

        }

    }catch(error){

        console.error(
            "🔥 Error FCM:",
            error
        );

    }

}

iniciarFirebaseNotifications();
var axios = require('axios');
var moment = require('moment');
var link = 'https://customotel.netlify.app';
var url = "https://prod-24.westeurope.logic.azure.com:443/workflows/569a612110c1413383145bef91f7f16f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NQOhxuQL1QuszDhzLwTahg3wlRez_h82_aIB-IawKKw";

module.exports = {
    message: function(content, background){
        return `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <title>Newsletter customotel</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <style type="text/css">
                        * {
                            -ms-text-size-adjust:100%;
                            -webkit-text-size-adjust:none;
                            -webkit-text-resize:100%;
                            text-resize:100%;
                        }
                        a{
                            outline:none;
                            color:#40aceb;
                            text-decoration:underline;
                        }
                        a:hover{text-decoration:none !important;}
                        .nav a:hover{text-decoration:underline !important;}
                        .title a:hover{text-decoration:underline !important;}
                        .title-2 a:hover{text-decoration:underline !important;}
                        .btn:hover{opacity:0.8;}
                        .btn a:hover{text-decoration:none !important;}
                        .btn{
                            -webkit-transition:all 0.3s ease;
                            -moz-transition:all 0.3s ease;
                            -ms-transition:all 0.3s ease;
                            transition:all 0.3s ease;
                        }
                        table td {border-collapse: collapse !important;}
                        .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;}
                        @media only screen and (max-width:500px) {
                            table[class="flexible"]{width:100% !important;}
                            table[class="center"]{
                                float:none !important;
                                margin:0 auto !important;
                            }
                            *[class="hide"]{
                                display:none !important;
                                width:0 !important;
                                height:0 !important;
                                padding:0 !important;
                                font-size:0 !important;
                                line-height:0 !important;
                            }
                            td[class="img-flex"] img{
                                width:100% !important;
                                height:auto !important;
                            }
                            td[class="aligncenter"]{text-align:center !important;}
                            th[class="flex"]{
                                display:block !important;
                                width:100% !important;
                            }
                            td[class="wrapper"]{padding:0 !important;}
                            td[class="holder"]{padding:30px 15px 20px !important;}
                            td[class="nav"]{
                                padding:20px 0 0 !important;
                                text-align:center !important;
                            }
                            td[class="h-auto"]{height:auto !important;}
                            td[class="description"]{padding:30px 20px !important;}
                            td[class="i-120"] img{
                                width:120px !important;
                                height:auto !important;
                            }
                            td[class="footer"]{padding:5px 20px 20px !important;}
                            td[class="footer"] td[class="aligncenter"]{
                                line-height:25px !important;
                                padding:20px 0 0 !important;
                            }
                            tr[class="table-holder"]{
                                display:table !important;
                                width:100% !important;
                            }
                            th[class="thead"]{display:table-header-group !important; width:100% !important;}
                            th[class="tfoot"]{display:table-footer-group !important; width:100% !important;}
                        }
                    </style>
                </head>
                <body style="margin:0; padding:0;" bgcolor="#eaeced">
                    <table style="min-width:320px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eaeced">
                        <!-- fix for gmail -->
                        <tr>
                            <td class="hide">
                                <table width="600" cellpadding="0" cellspacing="0" style="width:600px !important;">
                                    <tr>
                                        <td style="min-width:600px; font-size:0; line-height:0;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="wrapper" style="padding:0 10px;">
                                <!-- module 1 -->
                                <table data-module="module-1" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td data-bgcolor="bg-module" bgcolor="#eaeced">
                                            <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding:29px 0 30px;">
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <th class="flex" width="113" align="left" style="padding:0;">
                                                                    <table class="center" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td style="line-height:0;">
                                                                                <a target="_blank" style="text-decoration:none;" href="${link}"><img src="https://i.ibb.co/b1L9Gb2/Group-9-1.png" border="0" style="font:bold 12px/12px Arial, Helvetica, sans-serif; color:#606060;" align="left" vspace="0" hspace="0" width="113" alt="Customotel logo" /></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                                <th class="flex" align="left" style="padding:0;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td data-color="text" data-size="size navigation" data-min="10" data-max="22" data-link-style="text-decoration:none; color:#888;" class="nav" align="right" style="font:bold 13px/15px Arial, Helvetica, sans-serif; color:#888;">
                                                                                <a target="_blank" style="text-decoration:none; color:#888;" href="${link}">Accueil</a> &nbsp; &nbsp; <a target="_blank" style="text-decoration:none; color:#888;" href="${link}/price">Prix</a> &nbsp; &nbsp; <a target="_blank" style="text-decoration:none; color:#888;" href="${link}/login">Connexion</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- module 3 -->
                                <table data-module="module-3"  width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td data-bgcolor="bg-module" bgcolor="#eaeced">
                                            <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td class="img-flex"><img src="${background}" style="vertical-align:top;" width="600" height="300" alt="" /></td>
                                                </tr>
                                                <tr>
                                                    <td data-bgcolor="bg-block" class="holder" style="padding:65px 60px 50px;" bgcolor="#f9f9f9">
                                                        ${content}
                                                    </td>
                                                </tr>
                                                <tr><td height="28"></td></tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- fix for gmail -->
                        <tr>
                            <td style="line-height:0;"><div style="display:none; white-space:nowrap; font:15px/1px courier;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></td>
                        </tr>
                    </table>
                </body>
            </html>
        ` 
    },

    register: function(email, token){
        var bg = "https://image.freepik.com/free-vector/friendly-receptionists-from-hotel-registration-desk-help-clients_74855-4420.jpg";
        var content = `
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                        Bienvenue à la plateforme Customotel
                    </td>
                </tr>
                <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                        Votre compte a été créé avec l'email <a href="#">${email}</a><br>
                        pour pouvoir l'activer, veuillez cliquer sur le bouton ci-dessous
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 0 20px;">
                        <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#f5ba1c">
                                    <a target="_blank" style="text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;" href="${link}/activate/${token}">Activer mon compte</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
         var corps =  module.exports.message(content,bg);    
         axios.post(url,{content: corps, sendTo: email, subject:"Création compte customotel"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    forgot: function(email, hostelName, hostelShort, token){
        var bg = "https://image.freepik.com/free-photo/close-up-shocked-alarmed-redhead-man-slap-forehead-panicking-forgot-something_176420-27900.jpg";
        var content = `
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                        Mot de passe oublié ?
                    </td>
                </tr>
                <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                        Pour restaurer votre mot de passe oublié lié au compte <br>
                        email : <a href="#">${email}</a><br>
                        espace hotel : ${hostelName} (${hostelShort})<br>
                        
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 0 20px;">
                        <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#f5ba1c">
                                    <a target="_blank" style="text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;" href="${link}/restart/${token}">Ciquez ici</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
         var corps =  module.exports.message(content,bg);    
         axios.post(url,{content: corps, sendTo: email, subject:"Mot de passe oublié compte customotel"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    welcome: function(email, name, shortname){
        var bg = "https://image.freepik.com/free-vector/happy-tiny-people-near-huge-welcome-word-flat-illustration_74855-10808.jpg";
        var content = `
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                        BIENVENUE
                    </td>
                </tr>
                <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                        Bonjour <a href="#">${email}</a> <br>
                        Vous faites maintenant partie de l'espace  <a href="#">${name} (${shortname})</a> <br>
                        Parcourez votre tableau de bord pour pouvoir configurer votre espace personnel<br>
                        
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 0 20px;">
                        <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#f5ba1c">
                                    <a target="_blank" style="text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;" href="${link}">Découvrir</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
         var corps =  module.exports.message(content,bg);    
         axios.post(url,{content: corps, sendTo: email, subject:"Création du compte hotel sur customotel"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    createHostel: function(name, shortname, email){
        var bg = "https://image.freepik.com/free-vector/flat-new-normal-hotels-illustration_23-2148926991.jpg";
        var content = `
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                        Création de l'espace hotelier
                    </td>
                </tr>
                <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                        Le tableau de bord de l'hotel <a href="#">${name} (${shortname})</a> a été créé avec succès.<br>
                        Veuillez vous connecter pour avoir les paramètres d'APi et la documentation de l'API.
                    </td>
                </tr>
            </table>
        `
         var corps =  module.exports.message(content,bg);    
         axios.post(url,{content: corps, sendTo: email, subject:"Création de l'espace hôtel sur Customotel"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    subscriptionHotel: function(name, shortname, email, member, subscription){
        var content = `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <title>Internal_email-29</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <style type="text/css">
                        * {
                            -ms-text-size-adjust:100%;
                            -webkit-text-size-adjust:none;
                            -webkit-text-resize:100%;
                            text-resize:100%;
                        }
                        a{
                            outline:none;
                            color:#40aceb;
                            text-decoration:underline;
                        }
                        a:hover{text-decoration:none !important;}
                        .nav a:hover{text-decoration:underline !important;}
                        .title a:hover{text-decoration:underline !important;}
                        .title-2 a:hover{text-decoration:underline !important;}
                        .btn:hover{opacity:0.8;}
                        .btn a:hover{text-decoration:none !important;}
                        .btn{
                            -webkit-transition:all 0.3s ease;
                            -moz-transition:all 0.3s ease;
                            -ms-transition:all 0.3s ease;
                            transition:all 0.3s ease;
                        }
                        table td {border-collapse: collapse !important;}
                        .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;}
                        @media only screen and (max-width:500px) {
                            table[class="flexible"]{width:100% !important;}
                            table[class="center"]{
                                float:none !important;
                                margin:0 auto !important;
                            }
                            *[class="hide"]{
                                display:none !important;
                                width:0 !important;
                                height:0 !important;
                                padding:0 !important;
                                font-size:0 !important;
                                line-height:0 !important;
                            }
                            td[class="img-flex"] img{
                                width:100% !important;
                                height:auto !important;
                            }
                            td[class="aligncenter"]{text-align:center !important;}
                            th[class="flex"]{
                                display:block !important;
                                width:100% !important;
                            }
                            td[class="wrapper"]{padding:0 !important;}
                            td[class="holder"]{padding:30px 15px 20px !important;}
                            td[class="nav"]{
                                padding:20px 0 0 !important;
                                text-align:center !important;
                            }
                            td[class="h-auto"]{height:auto !important;}
                            td[class="description"]{padding:30px 20px !important;}
                            td[class="i-120"] img{
                                width:120px !important;
                                height:auto !important;
                            }
                            td[class="footer"]{padding:5px 20px 20px !important;}
                            td[class="footer"] td[class="aligncenter"]{
                                line-height:25px !important;
                                padding:20px 0 0 !important;
                            }
                            tr[class="table-holder"]{
                                display:table !important;
                                width:100% !important;
                            }
                            th[class="thead"]{display:table-header-group !important; width:100% !important;}
                            th[class="tfoot"]{display:table-footer-group !important; width:100% !important;}
                        }
                    </style>
                </head>
                <body style="margin:0; padding:0;" bgcolor="#eaeced">
                    <table style="min-width:320px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eaeced">
                        <!-- fix for gmail -->
                        <tr>
                            <td class="hide">
                                <table width="600" cellpadding="0" cellspacing="0" style="width:600px !important;">
                                    <tr>
                                        <td style="min-width:600px; font-size:0; line-height:0;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="wrapper" style="padding:0 10px;">
                                <!-- module 1 -->
                                <table data-module="module-1" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td data-bgcolor="bg-module" bgcolor="#eaeced">
                                            <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding:29px 0 30px;">
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <th class="flex" width="113" align="left" style="padding:0;">
                                                                    <table class="center" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td style="line-height:0;">
                                                                                <a target="_blank" style="text-decoration:none;" href="${link}"><img src="https://i.ibb.co/b1L9Gb2/Group-9-1.png" border="0" style="font:bold 12px/12px Arial, Helvetica, sans-serif; color:#606060;" align="left" vspace="0" hspace="0" width="113" alt="Customotel logo" /></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                                <th class="flex" align="left" style="padding:0;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td data-color="text" data-size="size navigation" data-min="10" data-max="22" data-link-style="text-decoration:none; color:#888;" class="nav" align="right" style="font:bold 13px/15px Arial, Helvetica, sans-serif; color:#888;">
                                                                                <a target="_blank" style="text-decoration:none; color:#888;" href="${link}">Accueil</a> &nbsp; &nbsp; <a target="_blank" style="text-decoration:none; color:#888;" href="${link}/price">Prix</a> &nbsp; &nbsp; <a target="_blank" style="text-decoration:none; color:#888;" href="${link}/login">Connexion</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- module 4 -->
                                <table data-module="module-4" data-thumb="" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td data-bgcolor="bg-module" bgcolor="#eaeced">
                                            <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td data-bgcolor="bg-block" class="holder" style="padding:64px 60px 10px;" bgcolor="#f9f9f9">
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 23px;">
                                                                    SUBSCRIPTION
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                                                                    Vous avez suscription à notre formulaire d'abonnement pour utiliser les services de l'API Customotel.
                                                                    Voici le recapitulatif de votre commande
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <th class="flex" width="300" align="left" style="vertical-align:top; padding:0;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <!-- post -->
                                                                        <tr>
                                                                            <td class="img-flex" height="300"><img src="https://image.freepik.com/free-vector/subscriber-concept-illustration_114360-2949.jpg" style="vertical-align:top;" width="300" height="100%" alt="" /></td>
                                                                        </tr>
                                                                        <!-- post -->
                                                                    </table>
                                                                </th>
                                                                <th class="flex" width="300" align="left" style="vertical-align:top; padding:0;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                                        <!-- post -->
                                                                        <tr>
                                                                            <td data-bgcolor="bg-inner-block-03" class="h-auto" height="300" bgcolor="#fff">
                                                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                                                    <tr>
                                                                                        <td class="description" style="padding:10px 10px 10px 1px;">
                                                                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                                                                <tr>
                                                                                                    <td data-color="title-2" data-size="size title-2" data-min="10" data-max="25" data-link-color="link title-2 color" data-link-style="text-decoration:none; color:#0071bd;" class="title-2" style="font:bold 15px/23px Arial, Helvetica, sans-serif; color:#0071bd; padding:0 0 6px;">
                                                                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    <img src="${subscription.logo}" style="vertical-align:top;" width="40" alt="" /> 
                                                                                                                    <strong style="font-size: 25px;">${subscription.name}</strong>
                                                                                                                    <pand style="color: #888; font-weight: lighter; font-size: 13px;">${subscription.resume}</span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td  style="padding:24px 0 2px 0;">Hotel : <small style="color: #888;">${name} (${shortname})</small></td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="center" style="font-size: 35px;color: #f5ba1c;"><strong style="margin-left: -82px;">${subscription.price}</strong> <small>€</small></td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td  style="padding:2px 0 2px 0;">durée : <small style="color: #888;">${subscription.duration} mois</small></td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td  style="padding:2px 0 2px 0;">Début : <small style="color: #888;">${moment(member.createdAt).format("DD/MM/YYYY à HH:mm:ss")}</small></td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td  style="padding:2px 0 2px 0;">Expiration : <small style="color: #888;">${moment(member.expired).format("DD/MM/YYYY à HH:mm:ss")}</small></td>
                                                                                                            </tr>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <!-- post -->
                                                                    </table>
                                                                </th>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr><td height="20"></td></tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- module 6 -->
                                <table data-module="module-6" data-thumb="" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td data-bgcolor="bg-module" bgcolor="#eaeced">
                                            <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td data-bgcolor="bg-block" class="holder" style="padding:64px 60px 50px;" bgcolor="#f9f9f9">
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 23px;">
                                                                    NOS OFFRES
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                                                                    Parcourez nos offres et prenez l'abonnement qui correspond à la taille de la votre enseigne.
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding:0 0 20px;">
                                                                    <table width="232" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="20" class="btn" align="center" style="font:bold 16px/18px Arial, Helvetica, sans-serif; color:#f9f9f9; text-transform:uppercase; mso-padding-alt:22px 10px; border-radius:3px;" bgcolor="#f5ba1c">
                                                                                <a target="_blank" style="text-decoration:none; color:#f9f9f9; display:block; padding:22px 10px;" href="${link}/price">Parcourir</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr><td height="28"></td></tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- fix for gmail -->
                        <tr>
                            <td style="line-height:0;"><div style="display:none; white-space:nowrap; font:15px/1px courier;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></td>
                        </tr>
                    </table>
                </body>
            </html>
        `

         axios.post(url,{content: content, sendTo: email, subject:"Commande formule d'abonnement Customotel"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    deletedAccount: function(email, name, shortname, message){
        var bg = "https://image.freepik.com/free-vector/subscriber-concept-illustration_114360-3895.jpg";
        var content = `
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                        Conformité
                    </td>
                </tr>
                <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                        Bonjour <a href="#">${email}</a> <br>
                        ${message}<br>
                        Pour le compte de  <a href="#">${name} (${shortname})</a> <br>
                        En cliquant sur le bouton en dessous
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 0 20px;">
                        <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#f5ba1c">
                                    <a target="_blank" style="text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;" href="${link}">Gestion utilisateurs</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
         var corps =  module.exports.message(content,bg);    
         axios.post(url,{content: corps, sendTo: email, subject:"Rappel de conformité"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    expiredTheSubscribe: function(m){
        var bg = "https://image.freepik.com/free-vector/top-view-race-track-with-start-finish-line-vector-realistic-illustration-empty-asphalt-road-car-rally-speed-racing_107791-3391.jpg";
        var content = `
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                        ECHEANCE
                    </td>
                </tr>
                <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                        Bonjour <a href="#">${m.Hostel.User_hostels[0].User.email}</a> <br>
                        Votre formule d'abonnement est arrivé à échéance, voici le résumé de la commande : 
                    </td>
                </tr>
                <tr>
                    <td data-color="title-2" data-size="size title-2" data-min="10" data-max="25" data-link-color="link title-2 color" data-link-style="text-decoration:none; color:#0071bd;" class="title-2" style="font:bold 15px/23px Arial, Helvetica, sans-serif; color:#0071bd; padding:0 0 6px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <img src="${m.Subscription.logo}" style="vertical-align:top;" width="40" alt="" /> 
                                    <strong style="font-size: 25px;">${m.Subscription.name}</strong>
                                    <pand style="color: #888; font-weight: lighter; font-size: 13px;">${m.Subscription.resume}</span>
                                </td>
                            </tr>
                            <tr>
                                <td  style="padding:24px 0 2px 0;">Hotel : <small style="color: #888;">${m.Hostel.name} (${m.Hostel.shortname})</small></td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size: 35px;color: #f5ba1c;"><strong style="margin-left: -82px;">${m.Subscription.price}</strong> <small>€</small></td>
                            </tr>
                            <tr>
                                <td  style="padding:2px 0 2px 0;">durée : <small style="color: #888;">${m.Subscription.duration} mois</small></td>
                            </tr>
                            <tr>
                                <td  style="padding:2px 0 2px 0;">Pris le : <small style="color: #888;">${moment(m.createdAt).format("DD/MM/YYYY à HH:mm:ss")}</small></td>
                            </tr>
                            <tr>
                                <td  style="padding:2px 0 2px 0;">A expiré le : <small style="color: #888;">${moment(m.expired).format("DD/MM/YYYY à HH:mm:ss")}</small></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="padding:0 0 20px;">
                        <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#f5ba1c">
                                    <a target="_blank" style="text-decoration:none; color:#f8f9fb; display:block; padding:12px 10px 10px;" href="${link}">Se réabonner</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `
         var corps =  module.exports.message(content,bg);    
         axios.post(url,{content: corps, sendTo: m.Hostel.User_hostels[0].User.email, subject:"Abonnement expiré"})
          .then(ans=> console.log(ans.data))
          .catch(err=>console.log(err))   
    },

    home: function(){
        return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>API - Customotel</title>
          <style type="text/css">
          body {
           padding-top: 0 !important;
           padding-bottom: 0 !important;
           padding-top: 0 !important;
           padding-bottom: 0 !important;
           margin:0 !important;
           width: 100% !important;
           -webkit-text-size-adjust: 100% !important;
           -ms-text-size-adjust: 100% !important;
           -webkit-font-smoothing: antialiased !important;
         }
         .tableContent img {
           border: 0 !important;
           display: block !important;
           outline: none !important;
         }
         a{
          color:#382F2E;
        }
    
        p, h1{
          color:#382F2E;
          margin:0;
        }
        p{
          text-align:left;
          color:#999999;
          font-size:14px;
          font-weight:normal;
          line-height:19px;
        }
    
        a.link1{
          color:#382F2E;
        }
        a.link2{
          font-size:16px;
          text-decoration:none;
          color:#ffffff;
        }
    
        h2{
          text-align:left;
           color:#222222; 
           font-size:19px;
          font-weight:normal;
        }
        div,p,ul,h1{
          margin:0;
        }
    
        .bgBody{
          background: #ffffff;
        }
        .bgItem{
          background: #ffffff;
        }
        
    @media only screen and (max-width:480px)
            
    {
            
    table[class="MainContainer"], td[class="cell"] 
        {
            width: 100% !important;
            height:auto !important; 
        }
    td[class="specbundle"] 
        {
            width:100% !important;
            float:left !important;
            font-size:13px !important;
            line-height:17px !important;
            display:block !important;
            padding-bottom:15px !important;
        }
            
    td[class="spechide"] 
        {
            display:none !important;
        }
            img[class="banner"] 
        {
                  width: 100% !important;
                  height: auto !important;
        }
            td[class="left_pad"] 
        {
                padding-left:15px !important;
                padding-right:15px !important;
        }
             
    }
        
    @media only screen and (max-width:540px) 
    
    {
            
    table[class="MainContainer"], td[class="cell"] 
        {
            width: 100% !important;
            height:auto !important; 
        }
    td[class="specbundle"] 
        {
            width:100% !important;
            float:left !important;
            font-size:13px !important;
            line-height:17px !important;
            display:block !important;
            padding-bottom:15px !important;
        }
            
    td[class="spechide"] 
        {
            display:none !important;
        }
            img[class="banner"] 
        {
                  width: 100% !important;
                  height: auto !important;
        }
        .font {
            font-size:18px !important;
            line-height:22px !important;
            
            }
            .font1 {
            font-size:18px !important;
            line-height:22px !important;
            
            }
    }
    
        </style>
    
    <script type="colorScheme" class="swatch active">
    {
        "name":"Default",
        "bgBody":"ffffff",
        "link":"382F2E",
        "color":"999999",
        "bgItem":"ffffff",
        "title":"222222"
    }
    </script>
    
      </head>
      <body paddingwidth="0" paddingheight="0"   style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
        <table bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent" align="center"  style='font-family:Helvetica, Arial,serif;'>
      <tbody>
        <tr>
          <td><table width="600" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" class="MainContainer">
      <tbody>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td valign="top" width="40">&nbsp;</td>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <!-- =============================== Header ====================================== -->   
        <tr>
            <td height='75' class="spechide"></td>
            
            <!-- =============================== Body ====================================== -->
        </tr>
        <tr>
          <td class='movableContentContainer ' valign='top'>
              <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td height="35"></td>
        </tr>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td valign="top" align="center" class="specbundle"><div class="contentEditableContainer contentTextEditable">
                                    <div class="contentEditable">
                                      <p style='text-align:center;margin:0;font-family:Georgia,Time,sans-serif;font-size:26px;color:#222222;'><span class="specbundle2"><span class="font1"> API REST &nbsp;</span></span></p>
                                    </div>
                                  </div></td>
          <td valign="top" class="specbundle"><div class="contentEditableContainer contentTextEditable">
                                    <div class="contentEditable">
                                      <p style='text-align:center;margin:0;font-family:Georgia,Time,sans-serif;font-size:26px;color:#1A54BA;'><span class="font"><img src="https://i.ibb.co/b1L9Gb2/Group-9-1.png" border="0" style="font:bold 12px/12px Arial, Helvetica, sans-serif; color:#606060; position: relative; top: -20px; left: -10px;" align="left" vspace="0" hspace="0" width="" alt="Customotel logo" /></span> </p>
                                    </div>
                                  </div></td>
        </tr>
      </tbody>
    </table>
    </td>
        </tr>
      </tbody>
    </table>
            </div>
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                              <tr>
                                <td valign='top' align='center'>
                                  <div class="contentEditableContainer contentImageEditable">
                                    <div class="contentEditable">
                                      <img src="https://i.ibb.co/gyjBDfP/line.png" width='251' height='43' alt='' data-default="placeholder" data-max-width="560">
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
            </div>
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                              <tr><td height='55'></td></tr>
                              <tr>
                                <td align='left'>
                                  <div class="contentEditableContainer contentTextEditable">
                                    <div class="contentEditable" align='center'>
                                      <h2 >Vous êtes une enseigne hôtelière ?</h2>
                                    </div>
                                  </div>
                                </td>
                              </tr>
    
                              <tr><td height='15'> </td></tr>
    
                              <tr>
                                <td align='left'>
                                  <div class="contentEditableContainer contentTextEditable">
                                    <div class="contentEditable" align='center'>
                                      <p >
                                        Cet api est fait pour vous. Créer un compte pour vous et vos associers.
                                        <br>
                                        <br>
                                        Notez les clients et découvrez combien ils sont notés en général
                                        <br>
                                        <br>
                                        Enfin,
                                        <br>
                                        <span style='color:#222222;'>Cher professionel</span>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
    
                              <tr><td height='55'></td></tr>
    
                              <tr>
                                <td align='center'>
                                  <table>
                                    <tr>
                                      <td align='center' bgcolor='#1A54BA' style='background:#1A54BA; padding:15px 18px;-webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px;'>
                                        <div class="contentEditableContainer contentTextEditable">
                                          <div class="contentEditable" align='center'>
                                            <a target='_blank' href='${link}' class='link2' style='color:#ffffff;'>Découvrez le service</a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr><td height='20'></td></tr>
                            </table>
            </div>
            <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td height='65'>
        </tr>
        <tr>
          <td  style='border-bottom:1px solid #DDDDDD;'></td>
        </tr>
        <tr><td height='25'></td></tr>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td valign="top" class="specbundle"><div class="contentEditableContainer contentTextEditable">
                                          <div class="contentEditable" align='center'>
                                            <p  style='text-align:left;color:#CCCCCC;font-size:12px;font-weight:normal;line-height:20px;'>
                                              <span style='font-weight:bold;'>[EQUIPE]</span>
                                              <br>
                                              <a target='_blank' href="https://jarceboukoro.fr">Jarce boukoro</a><br>
                                              <a target="_blank" class='link1' class='color:#382F2E;' href="https://oliwiachene.netlify.app/">Oliwia Chêne</a>
                                              <br>
                                              <a target='_blank' class='link1' class='color:#382F2E;' href="#">Yves-charbeli Kordahi</a><br>
                                              <a target='_blank' class='link1' class='color:#382F2E;' href="#">Alex Painnot</a><br>
                                              <a target='_blank' class='link1' class='color:#382F2E;' href="#">Andrija Pejic</a>
                                            </p>
                                          </div>
                                        </div></td>
          <td valign="top" width="30" class="specbundle">&nbsp;</td>
          <td valign="top" class="specbundle"><table width="100%" border="0" cellspacing="0" cellpadding="0">
    
    </table>
    </td>
        </tr>
      </tbody>
    </table>
    </td>
        </tr>
        <tr><td height='88'></td></tr>
      </tbody>
    </table>
    
            </div>
            
            <!-- =============================== footer ====================================== -->
          
          </td>
        </tr>
      </tbody>
    </table>
    </td>
          <td valign="top" width="40">&nbsp;</td>
        </tr>
      </tbody>
    </table>
    </td>
        </tr>
      </tbody>
    </table>
    </td>
        </tr>
      </tbody>
    </table>    
          </body>
          </html>
    

        `
    }
}

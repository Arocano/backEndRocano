const {Router}=require("express");
const router = Router();
const admin = require("firebase-admin");

const db = admin.firestore();

router.post("/api/envios",async (req, res) => {
    try {
        await db.collection("envios").
            doc().create({ producto: req.body.producto, cliente: req.body.cliente, encargado: req.body.encargado, direccion: req.body.direccion });
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

});

router.get("/api/envios/:envio_id",async (req, res) => {
(async()=>{

    try {
       const doc =db.collection("envios").doc(req.params.envio_id)
       const item=await doc.get();
       const envio=item.data();
       return res.status(200).json(envio);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
)();

})

router.get("/api/envios",async (req,res)=>{
try {
const query=db.collection("envios");
const querySnapshot= await query.get();
const docs=querySnapshot.docs;
const response =docs.map(doc=>({
id:doc.id,
producto:doc.data().producto,
cliente:doc.data().cliente,
encargado:doc.data().encargado,
direccion:doc.data().direccion
}))
return res.status(200).json(response);
} catch (error) {
console.log(error);
return res.status(500).send(error);

}
})

router.delete("/api/envios/:envio_id",async (req,res)=>{
try {
    const document=db.collection("envios").doc(req.params.envio_id);
    await document.delete();
    return res.status(200).json();
} catch (error) {
    return res.status(500).send(error);
}
})

router.put("/api/envios/:envio_id",async (req,res)=>{
try {
  const document = db.collection('envios').doc(req.params.envio_id)
    await document.update({
        producto: req.body.producto,
        cliente: req.body.cliente,
        encargado: req.body.encargado,
        direccion: req.body.direccion
    })
    return res.status(200).json();
} catch (error) {
    return res.status(500).send(error);
}
})
module.exports = router;
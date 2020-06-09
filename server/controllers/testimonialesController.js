const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async(req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
})
}

exports.agregarTestimonial = async (req, res) => {
    //validar campos correctos
    console.log(req.body)
    let {nombre, correo, mensaje} = req.body;

     let errores = [];

     if(!nombre){
         errores.push({'mensaje' : 'Agrega tu nombre'})
     }
     if(!correo){
         errores.push({'mensaje' : 'Agrega tu correo'})
     }
     if(!mensaje){
         errores.push({'mensaje' : 'Agrega tu mensaje'})
     }

     //revisar errores
    if (errores.length > 0 ){
     //muestra errores
     const testimoniales = await Testimonial.findAll()
         res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
         })

     }else{
         //almacena el msj en db
         Testimonial.create({
             nombre,
             correo,
             mensaje
         })
         .then(testimonial => res.redirect('/testimoniales'))
         .catch(error => console.log(error));
     }
}
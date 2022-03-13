const express=require("express");
const mongoose =require("mongoose");
const app=express();
// app.use(express.json()):
const connect=()=>{
    return mongoose.connect(
        "mongodb+srv://Aman123:aman@cluster0.v2cb4.mongodb.net/amanDB?retryWrites=true&w=majority"
    );
};
const SectionSechema=new mongoose.Schema({
    SectionSechema:{type:String,required:true},

},
{
    versionKey:false,
    timestamps:true,
}
);
const Sections=mongoose.model("section",SectionSechema);
const booksSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        body:{type:String,required:true},
        authorID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"authors",
            required:true,
        },
        sectionID:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"books",
            required:true,
        },
    
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
const Books=mongoose.model("books",booksSchema);
const authorsSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
},
{
    versionKey:false,
    timestamps:true,
}
);
const Authors=mongoose.model("authors",authorsSchema);
app.get("/sections",async(req,res)=>{
    try{
        const sections=await Sections.create(req.body);
        return res.status(201).send({sections:sections});
    }catch(err){
        return res
        .status(500)
        .send({message:err.message});
    }
});
// app.post("/sections",async(req,res)=>{
//     try{
//         const sections=await Sections.create(req.body);
//         return res.status(201).send({sections:sections});
//     }catch(err){
//         return res
//         .status(500)
//         .send({message:err.message});
//     }
// })
app.get("/sections/:id",async(res,req)=>{
   try{
    const sections=await Sections.findById(req.params.id).lean().exec();
    return res.status(200).send(user);
   }catch(err){
       return res.status(500).send({message:err.message});

   }
});
app.patch("sections/:id",async(req,res)=>{
    try{
        const sections=await sections.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .lean()
        .exec()
    }catch(err){
        return res.status(500).send({message:err.message});

    }
   
});
app.delete("/sections/:id",async(req,res)=>{
    try{
      const sections=await sections.findByIdAndDelete(req.params.id).lean().exec();
      
      return res.status(200).send(user);
    }catch(err){
      return res.status(500).send({message:err.message});
    }
  });
  app.get("/books",async(req,res)=>{
      try{
          const books=await Books.find().lean().exec();
          return res.status(200).send({boks:books});
      }catch(err){
          return res.status(500).send({message:err.message});

      }
  });
  app.post("/books",async(req,res)=>{
      try{
          const books=await Books.create(req.body);
          return res.status(200).send({books:books});
      }catch(err){

          return res.status(500).send({message:err.message});

      }
  });
  app.get("/books/:id",async(req,res)=>{
      try{
          const books=await Books.findById(req.params.id).lean().exec();
          return res.status(200).send(user);
      }catch(err){
          return res.status(500).send({message:err.message})
      }
  });
  app.patch("books/:id",async(req,res)=>{
     try{
        const books=await Books.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        .lean().exec();
        return res.status(200).send(user);
     }catch(err){
         return res.status(500).send({message:err.message});
     }
  });
  app.delete("/books/:id",async(req,res)=>{
      try{
          const books=await Books.findByIdAndDelete(req.params.id).lean().exec();
          return res.status(200).send(user);
      }catch(err){
          return res.status(500).send({message:err.message});
      }
  });
  app.get("/authors",async(req,res)=>{
     try{
        const authors=await Authors.find().lean().exec();
        return res.status(200).send({authors:authors});
     }catch(err){
         return res.status(500).send({ message: err.message });

     }
  })
  app.post("/authors",async(req,res)=>{
      try{
          const author=await Authors.create(req.body);
          return res.status(201).send({authors:authors});
      }catch(err){
          return res.status(500).send({message:err.message});
      }
  });
  app.get("/authors/:id",async(req,res)=>{
      try{
          const authors=await Authors.findById(req.params.id).lean().exec();
          return res.status(200).send(user);
      }catch(err){
          return res.status(500).send({message:err.message});

      }
  });
  app.patch("authors/:id",async(req,res)=>{
      try{
          const authors=await Authors.findByIdAndUpdate(req.params.id,req.body,{
              new:true,
          }).lean().exec();
          return res.status(200).send(user);
      }catch(err){
          return res.status(500).send({message:err.message});
      }
  });
  app.delete("authors/:id",async(req,res)=>{
      try{
          const authors=await Authors.findByIdAndDelete(req.params.id).lean().exec();
          return res.status(200).send(user);
      }catch(err){
          return res.status(500).send({message:err.message});
      }
  });
  app.delete("/authors/:id",async(req,res)=>{
      try{
          const authors= await Authors.findByIdAndDelete(req.params.id).lean().exec();
          return res.status(200).send(user);
      }catch(err){
          return res.status(500).send({message:err.message});
      }
  });
  app.listen(7000,async()=>{
      try{
          connect();
      }catch(error){
          console.log("Something went wrong");
      }
      console.log("lisiting at port 7000")
  })
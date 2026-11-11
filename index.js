import express from "express";
import db from "./repository/index.js";

const app = express();
app.use(express.json());




//buscar as pendentes
//http://localhost:3000/api/v1/tarefa/pendentes
app.get("/api/v1/tarefa/pendentes", (req, res) => {

    const tarefasPendentes = db.filter((p) => p.concluido === false);
    return res.status(200).json(tarefasPendentes);
});

// editar true para false e false para true
//http://localhost:3000/api/v1/tarefa/1
app.get("/api/v1/tarefa/:id/concluido", (req, res) => {
    const { id } = req.params;
    const tarefa = db.find((p) => p.id === Number(id));
    if (!tarefa) {
        return res.status(404).json({ error: "tarefa não encontrado" });
    }
    tarefa.concluido = !tarefa.concluido;
    return res.status(200).json(tarefa);
});


//http://localhost:3000/api/v1/tarefa
app.post("/api/v1/tarefa", (req, res) => {
    const { id, descricao, data, concluido } = req.body

    if (! id || !descricao || !data || concluido === undefined) {
        return res.status(400).json({ error: "Envie todos os campos obrigatórios" });
    }

    db.push({ id, descricao, data, concluido });
    return res.status(201).json({ message: "Tarafa criado com sucesso!" });
});

// {
//   "id": 1,
//   "descricao": "Tarefa 1",
//   "data": "04-06-08",
//   "concluido": true
// }




//http://localhost:3000/api/v1/tarefa/1
app.get("/api/v1/tarefa/:id", (req, res) => {
    const { id } = req.params;
    const tarefa = db.find((p) => p.id === Number(id));
    if (!tarefa) {
        return res.status(404).json({ error: "tarefa não encontrado" });
    }
    return res.status(200).json(tarefa);
});




//http://localhost:3000/api/v1/tarefa/1
app.put("/api/v1/tarefa/:id", (req, res) => {
const { id } = req.params;
const { descricao, data, concluido } = req.body;
const tarefaIndex = db.findIndex((p) => p.id === Number(id));
if (tarefaIndex === -1) {
    return res.status(404).json({ error: "tarefa não encontrado" }); 
}

db[tarefaIndex] = { id: Number(id), descricao, data, concluido };
return res.status(200).json({
    message: "tarefa atualizado com sucesso!",
    tarefa: db[tarefaIndex],
    });

});

// {
//   "descricao": "Mudando com o PUT",
//   "data": "00-11-22",
//   "concluido": false
// }



    
//http://localhost:3000/api/v1/tarefa/1
app.delete("/api/v1/tarefa/:id", (req, res) => {
    const { id } = req.params;
    const tarefaIndex = db.findIndex((p) => p.id === Number(id)); 
    if(tarefaIndex === -1) {
        return res.status(404).json({ error: "tarefa não encontrado" });
    }
    return res.status(200).json({
        message: "tarefa deletado com sucesso!",
        tarefa: db.splice(tarefaIndex, 1),
    });
});










app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


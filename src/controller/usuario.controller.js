const userService = require("../service/usuario.service");

const findUserByIdController = async (req, res) => {
    try {
        const user = await userService.findUserByIdService(req.params.id);

        if (!user) {
            return res.status(404).send({ message: "Usuario não encontrado, tente novamente" });
        }
        return res.status(200).send(user);
    }
    catch (err) {
        if (err.kind == "ObjectId") {
            console.log(err.kind == "ObjectId");
            res.status(400).send({ Message: `ID  informado esta incorreto, tente novamente! ` });
        }
        console.log(`erro: ${err.message}`);
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
    }
};

const findAllUserController = async (req, res) => {
    try {
        res.status(200).send(await userService.findAllUserService(req.query.limit, req.query.offset));
    }
    catch (err) {
        console.log(`erro: ${err.message}`);
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
    }
};

const createUserController = async (req, res) => {
    try {
        const body = req.body;
        if (!body.nome) {
            return res.status(400).send({
                message: `O campo 'nome' precisa ser preenchido! `
            });
        }
        return res.status(201).send(await userService.createUserService(body));
    }
    catch (err) {
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
        console.log(`erro: ${err.message}`);
    }
};

const updateUserController = async (req, res) => {
    try {
        const body = req.body;
        if (!body.nome) {
            return res.status(400).send({
                message: `O campo 'nome' precisa ser preenchido! `
            });
        }

        return res.send(await userService.updateUserService(req.params.id, body));

    }
    catch (err) {
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
        console.log(`erro: ${err.message}`);
    }
};

const removeUserController = async (req, res) => {
    try {

        const deletedUser = await userService.removeUserService(req.params.id);

        if (deletedUser == null) {
            res.status(404).send({ Message: `Usuario náo encontrado, tente novamente! ` });
        }
        else {
            res.status(200).send({ Message: `Sucesso, usuario deletado! ` });
        }
    }
    catch (err) {
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
        console.log(`erro: ${err.message}`);
    }
};

const addUserAddressController = async (req, res) => {
    try {
        const endereco = await userService.addUserAddressService(req.params.id, req.body);

        if (endereco.ok === 1) {
            console.log("Algo deu errado no endereço, tente novamente!");
            res.status(400).json({ message: `Algo deu errado no endereço, tente novamente!` });
        } else {
            console.log("Endereço adicionado com sucesso!");
            res.status(201).json({ message: `Endereço adicionado com sucesso!` });
        }
    }
    catch (err) {
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
        console.log(`erro: ${err.message}`);
    }
};

const removeUserAddressController = async (req, res) => {
    try {
        const endereco = await userService.removeUserAddressService(req.body.id, req.body.addressId);

        let found = false;

        endereco.value.enderecos.map((valor, chave) => {
            if (valor._id == req.body.addressId) {
                found = true;
            }
        });


        if (found) {
            res.status(200).send({ message: `Endereço removido com sucesso!` });
        }
        else {
            res.status(400).send({ message: `Algo deu errado no endereço, não foi removido tente novamente!` })
        }
    }
    catch (err) {
        res.status(500).send({ Message: `Erro inesperado tente novamente! ` });
        console.log(`erro: ${err.message}`);
    }
};




const addUserFavProduct = async (req, res) => {
    try {



    } catch (err) {
        console.log(`Erro: ${err.message}`);
        return res.status(500).send("Erro inesperado, tente novamente mais tarde");
    }
}

const removeUserFavProduct = async (req, res) => {
    try {

    } catch (err) {
        console.log(`Erro: ${err.message}`);
        return res.status(500).send("Erro inesperado, tente novamente mais tarde");
    }
}

module.exports = {
    findUserByIdController,
    findAllUserController,
    createUserController,
    updateUserController,
    removeUserController,
    addUserAddressController,
    removeUserAddressController,
    addUserFavProduct,
    removeUserFavProduct

}
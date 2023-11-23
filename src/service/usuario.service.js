const Usuario = require("../model/Usuario");

const findAllUserService = (limit, offset) => {
    return Usuario.find().limit(limit).skip(offset);
};

const findUserByIdService = (id) => {
    return Usuario.findById(id);
};

const createUserService = (body) => {
    return Usuario.create(body);
};

const updateUserService = (id, body) => {
    return Usuario.findByIdAndUpdate(id, body, { returnDocument: "after" });
};

const removeUserService = (id) => {
    return Usuario.findByIdAndDelete(id);
};

const addUserAddressService = (id, endereco) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                enderecos: endereco,
            }
        },
        {
            rawResult: true,
        }
    );
};

const removeUserAddressService = async (id, addressId) => {
    
        const result = await Usuario.findOneAndUpdate(
            { _id: id },
            { $pull: { enderecos: { _id: addressId } } },
            { rawResult: true }
        );

        if (!result) {
            throw new Error("User not found or address not removed.");
        }

        return result;
    }

const addUserFavProductService = (id, produto) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                produtos_fav: {
                    _id: produto._id,
                }
            }
        },
        {
            rawResult: true,
        }
    )
};

const removeUserFavProductService = (id, produto) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                produtos_fav: {
                    _id: produto._id,
                }
            }
        },
        {
            rawResult: true,
        }
    )

};

module.exports = {
    findUserByIdService,
    findAllUserService,
    createUserService,
    updateUserService,
    removeUserService,
    addUserAddressService,
    removeUserAddressService,
    addUserFavProductService,
    removeUserFavProductService
}
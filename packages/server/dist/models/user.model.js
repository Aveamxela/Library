"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.addUser = exports.findByCredentials = exports.getUserById = exports.getAllUsers = void 0;
const pool_1 = require("../config/pool");
const drizzle_orm_1 = require("drizzle-orm");
const utils_1 = require("../utils");
const users_1 = require("../schemas/users");
const getAllUsers = () => {
    try {
        return pool_1.db.select({
            id: users_1.users.id,
            username: users_1.users.username,
        })
            .from(users_1.users)
            .execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération des utilisateurs; ${err.message}`);
        throw new Error("Impossible de récupérer les utilisateurs");
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = (id) => {
    try {
        return pool_1.db.select({
            id: users_1.users.id,
            username: users_1.users.username,
            email: users_1.users.email,
        })
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id))
            .execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur");
    }
};
exports.getUserById = getUserById;
const findByCredentials = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield pool_1.db.select({
            id: users_1.users.id,
            email: users_1.users.email,
            username: users_1.users.username,
            password: users_1.users.password,
        })
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.email, email))
            .limit(1) //on en récupère qu'un seul
            .execute();
        return user.length > 0 ? user[0] : null;
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur");
    }
});
exports.findByCredentials = findByCredentials;
const addUser = (user) => {
    try {
        return pool_1.db.insert(users_1.users).values(user).returning({ id: users_1.users.id }).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de créer l'utilisateur");
    }
};
exports.addUser = addUser;
const updateUser = (user) => {
    try {
        return pool_1.db.update(users_1.users).set(user).where((0, drizzle_orm_1.eq)(users_1.users.id, user.id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de mise à jour  l'utilisateur; ${err.message}`);
        throw new Error("Impossible de mettre à jour l'utilisateur");
    }
};
exports.updateUser = updateUser;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const argon2_1 = __importDefault(require("argon2"));
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!password || password.length < 6) {
            console.error('Mot de passe invalide: trop court ou vide');
            return;
        }
        try {
            const hash = yield argon2_1.default.hash(password, {
                type: argon2_1.default.argon2id,
                memoryCost: 2 ** 16,
                timeCost: 3,
                parallelism: 1,
                //pas de salt, on laisse argon le faire aléatoirement car ça peut poser problème si deux users ont le même mdp
                //salt: Buffer.from("SuperSaltGentil")
            });
            console.log('Mot de passe hashé: ', hash);
            return hash;
        }
        catch (err) {
            console.error('Erreur de hashage: ', err);
        }
    });
}
function verifyPassword(hashedPassword, inputPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield argon2_1.default.verify(hashedPassword, inputPassword);
        }
        catch (err) {
            console.error('Erreur lors de la vérification: ', err);
            return false;
        }
    });
}

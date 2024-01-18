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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfo = exports.getUser = exports.deleteUser = exports.getAllUsers = exports.getloggedInUserInfo = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const auth_1 = require("../../utils/auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield user_model_1.default.findOne({ email: req.body.email });
        if (isExist) {
            return res.status(403).send({
                message: `${req.body.email} is already Exist!`,
                success: false,
            });
        }
        else {
            const newUser = new user_model_1.default({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcryptjs_1.default.hashSync(req.body.password),
                phoneNumber: req.body.phoneNumber,
                address: req.body.address
            });
            const user = yield newUser.save();
            const token = yield (0, auth_1.generateToken)(user);
            res.status(200).send({
                message: "Account created  successfully",
                success: true,
                user: (0, auth_1.removeSensitiveInfo)(user),
                accessToken: token,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                success: false,
                type: "email",
                message: "User not found",
            });
        }
        if (user && bcryptjs_1.default.compareSync(req.body.password, user.password)) {
            const accessToken = yield (0, auth_1.generateToken)(user);
            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                user: (0, auth_1.removeSensitiveInfo)(user),
                accessToken,
            });
        }
        else {
            res.status(401).send({
                success: false,
                type: "password",
                message: "Invalid password",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.loginUser = loginUser;
const getloggedInUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (user) {
            res.status(200).send((0, auth_1.removeSensitiveInfo)(user));
        }
        else {
            res.status(401).send("User Not Found");
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
exports.getloggedInUserInfo = getloggedInUserInfo;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({}).sort({ _id: -1 }).select("-password");
        res.status(200).send({
            data: users,
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.findOneAndDelete({ _id: req.params.id })
            .exec()
            .then((result) => {
            res.status(200).send({
                message: `${result.name} is successfully removed!`,
                success: true,
            });
        })
            .catch((err) => {
            res.status(401).send({
                message: err.message,
                success: false,
            });
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            success: false,
        });
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(401).send("User Not Found");
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
});
exports.getUser = getUser;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = __rest(req.body, []);
        const isExist = yield user_model_1.default.findOne({ _id: req.user._id });
        const image = req.file ? req.file.path : undefined;
        const updateInfo = image ? Object.assign({ image }, info) : info;
        if (isExist) {
            const result = yield user_model_1.default.findByIdAndUpdate({ _id: req.user._id }, updateInfo, {
                new: true,
            });
            res.status(200).json({
                success: true,
                message: "User Info Update successfully",
                data: (0, auth_1.removeSensitiveInfo)(result),
            });
        }
        else {
            res.status(201).json({
                success: false,
                message: "Update unsuccessful",
            });
        }
    }
    catch (err) {
        res.status(201).json({
            success: false,
            message: err.message,
        });
    }
});
exports.updateUserInfo = updateUserInfo;

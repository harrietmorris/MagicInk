"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI((_a = process.env.GEMINI_API_KEY) !== null && _a !== void 0 ? _a : '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
exports.default = model;

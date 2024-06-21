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
const router_1 = __importDefault(require("@koa/router"));
const prompt_1 = __importDefault(require("./prompt"));
const gemini_1 = __importDefault(require("./gemini"));
const router = new router_1.default();
router.get('/', (ctx) => {
    ctx.body = 'Hello world!';
});
router.post('/story', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { age, location, readingTime, themes, simpleLanguage, words } = ctx.body;
    try {
        const prompt = (0, prompt_1.default)(age, location, readingTime, themes, simpleLanguage, words);
        const result = yield gemini_1.default.generateContent(prompt);
        const response = yield result.response;
        const text = response.text();
        ctx.body = text;
    }
    catch (e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = 'Internal server error';
    }
}));
exports.default = router;

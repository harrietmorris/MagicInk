"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const router = new router_1.default();
router.get('/', (ctx) => {
    ctx.body = 'Hello world!';
});
exports.default = router;

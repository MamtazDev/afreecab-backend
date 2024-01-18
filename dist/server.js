"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const booking_routes_1 = __importDefault(require("./modules/booking/booking.routes"));
const db_1 = __importDefault(require("./config/db"));
// CONFIGURATIONS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8000;
// DATABASE CONNECTION
(0, db_1.default)();
// ROUTES
app.use('/api/v1/user', user_routes_1.default);
app.use('/api/v1/booking', booking_routes_1.default);
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.get("/", (req, res) => {
    res.send("Server is runnig");
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

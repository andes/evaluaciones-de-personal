(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/backend/src/app/Efectores/Routes/efectores.ts":
/*!************************************************************!*\
  !*** ./apps/backend/src/app/Efectores/Routes/efectores.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_efectores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schemas/efectores */ "./apps/backend/src/app/Efectores/schemas/efectores.ts");



const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/rmEfectores', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const data = yield _schemas_efectores__WEBPACK_IMPORTED_MODULE_2__["EfectorModel"].find().sort({ descripcion: 1 }); // 1 para orden ascendente
        res.json(data);
    }
    catch (error) {
        console.error('Error al obtener los Efectores:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
}));
router.get('/rmEfectores/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const id = req.params.id;
    const respuesta = yield _schemas_efectores__WEBPACK_IMPORTED_MODULE_2__["EfectorModel"].findById(id);
    res.json(respuesta);
}));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/backend/src/app/Efectores/schemas/efectores.ts":
/*!*************************************************************!*\
  !*** ./apps/backend/src/app/Efectores/schemas/efectores.ts ***!
  \*************************************************************/
/*! exports provided: EfectorModel, EfectorSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EfectorModel", function() { return EfectorModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EfectorSchema", function() { return EfectorSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const Schema = mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"];
const EfectorSchema = new Schema({
    nombre: { type: String, required: true }
});
const EfectorModel = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('Efectores', EfectorSchema, 'efectores');



/***/ }),

/***/ "./apps/backend/src/app/Items/routes/items.ts":
/*!****************************************************!*\
  !*** ./apps/backend/src/app/Items/routes/items.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schemas/items */ "./apps/backend/src/app/Items/schemas/items.ts");



// import { application } from '../../application';
const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/rmItems', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const data = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].find().sort({ descripcion: 1 }); // 1 para orden ascendente
        res.json(data);
    }
    catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
}));
router.get('/rmItems/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const id = req.params.id;
    const respuesta = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].findById(id);
    res.json(respuesta);
}));
// Ver si la descripción existe
router.get('/rItems/verificar-descripcion/:descripcion', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const descripcion = req.params.descripcion;
    const { id } = req.query;
    // Buscar una items con la misma descripción pero excluir la ite actual
    const categoria = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].findOne({ descripcion: descripcion, _id: { $ne: id } });
    if (categoria) {
        res.json(false); // La descripción ya existe (no es única)
    }
    else {
        res.json(true); // La descripción es única (puede usarse)
    }
}));
//alta
router.post('/rmItems', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        console.log('Solicitud POST recibida en /rmItems:', req.body); // Log de la solicitud recibida
        const newItems = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].create(req.body);
        res.json(newItems);
    }
    catch (error) {
        console.error('Error al crear el ítem:', error); // Log del error
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
//modificar
router.put('/rItems/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const nuevaDescripcion = req.body.descripcion; // Obtener la nueva descripción
        // Verificar si ya existe cualquier categoría con la misma descripción
        const categoriaExistente = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].findOne({ descripcion: nuevaDescripcion });
        // Si se encuentra una categoría con la misma descripción, devolver un error
        if (categoriaExistente) {
            return res.status(400).json({
                error: 'La descripción ya se encuentra registrada en otro documento.'
            });
        }
        // Proceder a la actualización ya que no se encontró ninguna categoría con esa descripción
        const respuesta = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Si no se encuentra la categoría con el ID proporcionado
        if (!respuesta) {
            return res.status(404).json({ error: 'No se encontró la categoría para actualizar.' });
        }
        // Mostrar la respuesta en la consola
        console.log('Categoría actualizada:', respuesta);
        // Responder con la categoría actualizada
        res.json(respuesta);
    }
    catch (error) {
        // Manejo de errores generales
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
// Ruta PATCH para actualizar parcialmente un documento
router.patch('/rItems/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const actualizacion = req.body;
        const opciones = { new: true }; // Para devolver el documento actualizado
        //const respuesta = await modelo.findByIdAndUpdate(id, actualizacion, opciones);
        const respuesta = yield _schemas_items__WEBPACK_IMPORTED_MODULE_2__["modelo"].findByIdAndUpdate(_id, actualizacion, opciones);
        if (respuesta) {
            res.json(respuesta);
        }
        else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
/**
router.delete('/rItems/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await modelo.findByIdAndDelete(id);
        if (respuesta) {
            res.json({ message: 'Documento eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});
*/
// thunder   http://localhost:3000/api/rItems/
//put modificaar
//router.post('/items', (req, res) => {
//    const newItem = req.body; // El nuevo item se espera en el cuerpo de la solicitud
//    items.push(newItem);
//    res.status(201).json(newItem); // Responder con el item creado y un código de estado 201
//});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/backend/src/app/Items/schemas/items.ts":
/*!*****************************************************!*\
  !*** ./apps/backend/src/app/Items/schemas/items.ts ***!
  \*****************************************************/
/*! exports provided: modelo, ItemModel, ItemSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modelo", function() { return modelo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemModel", function() { return ItemModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemSchema", function() { return ItemSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const schema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    descripcion: { type: String },
    valor: { type: Number },
});
const modelo = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('items', schema, 'edItems');
//                                   este formulario             tabla o collection
const Schema = mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"];
const ItemSchema = new Schema({
    descripcion: { type: String, required: true },
    valor: { type: Number, required: true }
});
const ItemModel = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('Items', ItemSchema, 'edItems');



/***/ }),

/***/ "./apps/backend/src/app/PlanillaED/Router/PlanillaED.ts":
/*!**************************************************************!*\
  !*** ./apps/backend/src/app/PlanillaED/Router/PlanillaED.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Schemas/PlanillaED */ "./apps/backend/src/app/PlanillaED/Schemas/PlanillaED.ts");
/* harmony import */ var _Items_schemas_items__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Items/schemas/items */ "./apps/backend/src/app/Items/schemas/items.ts");




const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/planillasED/:idPlanilla/categorias/:idCategoria/items', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { idPlanilla, idCategoria } = req.params;
        // Buscar la planilla por ID y popular las categorías y sus ítems
        const planilla = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findById(idPlanilla)
            .populate('categorias.categoria') // Asegúrate de que 'categorias.categoria' es un campo de referencia adecuado
            .lean(); // Usa .lean() para mejorar el rendimiento al no necesitar instanciar objetos de Mongoose
        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }
        // Filtrar la categoría específica dentro de la planilla
        const categoriaEncontrada = planilla.categorias.find((cat) => String(cat.categoria._id) === String(idCategoria) // Asegúrate de que se compara correctamente el ID
        );
        if (!categoriaEncontrada) {
            return res.status(404).json({ message: 'Categoría no encontrada en la planilla.' });
        }
        // Extraer los ítems con id, descripcion y valor
        const itemsFiltrados = categoriaEncontrada.items.map((item) => ({
            _id: item._id,
            descripcion: item.descripcion,
            valor: item.valor,
        }));
        // Responder con los datos encontrados
        res.json({
            descripcionCategoria: categoriaEncontrada.descripcion,
            items: itemsFiltrados // Devolver los ítems filtrados
        });
    }
    catch (error) {
        console.error('Error al obtener los ítems de la categoría:', error);
        res.status(500).json({ message: 'Error al obtener los ítems de la categoría.', error });
    }
}));
router.post('/planillasED', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { idEfector, idServicio, descripcion } = req.body;
        // Verificar si ya existe una planilla con el mismo idEfector e idServicio
        const planillaExistente = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findOne({ idEfector, idServicio });
        if (planillaExistente) {
            return res.status(400).json({ message: 'Ya existe una planilla con este Efector y Servicio.' });
        }
        // Si no existe, crear una nueva planilla
        const nuevaPlanilla = new _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"]({
            idEfector,
            idServicio,
            descripcion,
            fechaCreacion: new Date(),
            categorias: [],
        });
        const planillaGuardada = yield nuevaPlanilla.save();
        res.status(201).json(planillaGuardada);
    }
    catch (error) {
        console.error('Error al crear la planilla:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
// Obtener todas las planillas
router.get('/planillasED', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const planillas = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].find()
            .populate('categorias.categoria')
            .lean(); // Convertir a objetos JSON planos
        // Ordenar las categorías dentro de cada planilla
        planillas.forEach(planilla => {
            if (planilla.categorias && Array.isArray(planilla.categorias)) {
                planilla.categorias.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
            }
        });
        res.json(planillas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las planillas.', error });
    }
}));
// Obtener categorías e ítems de una planilla específica
router.get('/planillasED/:id/categorias', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Buscar la planilla por ID y popular las categorías
        const planilla = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findById(id)
            .populate('categorias.categoria')
            .lean();
        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }
        // Agrupar categorías con el conteo de ítems
        const categoriasResumen = planilla.categorias.map((categoria) => ({
            id: categoria.categoria._id,
            descripcion: categoria.categoria.descripcion,
            totalItems: categoria.items.length // Total de ítems en la categoría
        }));
        res.json({
            planillaId: id,
            descripcion: planilla.descripcion,
            categorias: categoriasResumen,
        });
    }
    catch (error) {
        console.error('Error al obtener categorías y total de ítems:', error);
        res.status(500).json({ message: 'Error al obtener categorías y total de ítems.', error });
    }
}));
// Agregar un console.log en la ruta del PUT
router.put('/planillasED/:id/categorias', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { categoria, descripcionCategoria, items } = req.body;
        // Verificar que los datos están bien estructurados
        if (!categoria || !descripcionCategoria || !Array.isArray(items)) {
            return res.status(400).json({ message: 'Faltan datos: categoría, descripción o ítems.' });
        }
        // Buscar la planilla por ID
        const planilla = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findById(req.params.id);
        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }
        // Buscar si la categoría ya existe en la planilla
        const categoriaExistente = planilla.categorias.find((cat) => String(cat.categoria) === String(categoria));
        if (categoriaExistente) {
            // Actualizar la descripción
            categoriaExistente.descripcion = descripcionCategoria;
            // Filtrar ítems nuevos y agregarlos
            const nuevosItems = items.filter((item) => !categoriaExistente.items.some((itemExistente) => String(itemExistente.id) === String(item.id)));
            if (nuevosItems.length > 0) {
                categoriaExistente.items = [...categoriaExistente.items, ...nuevosItems];
            }
        }
        else {
            // Si la categoría no existe, agregarla
            planilla.categorias.push({ categoria, descripcion: descripcionCategoria, items });
        }
        // Guardar los cambios en la base de datos
        yield planilla.save();
        res.status(200).json({ message: 'Planilla actualizada exitosamente', planilla });
    }
    catch (error) {
        console.error('Error al actualizar la planilla:', error.message);
        res.status(500).json({ message: 'Error interno al actualizar la planilla.', error: error.message });
    }
}));
// Eliminar todas las planillas
router.delete('/planillasED', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const result = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].deleteMany({});
        res.json({
            message: 'Todas las planillas han sido eliminadas.',
            deletedCount: result.deletedCount
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar todas las planillas.', error });
    }
}));
/**
 */
router.get('/planillasED/:idDocumento/items-disponibles', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { idDocumento } = req.params;
        // Buscar el documento (planilla) por su ID
        const planilla = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findById(idDocumento).lean();
        if (!planilla) {
            return res.status(404).json({ message: 'Documento no encontrado.' });
        }
        // Recolectar todos los IDs de ítems que ya están asociados en la planilla.
        // Se asume que la planilla tiene un arreglo "categorias" y cada categoría tiene un arreglo "items"
        const itemIdsEnDocumento = [];
        if (planilla.categorias && Array.isArray(planilla.categorias)) {
            planilla.categorias.forEach((cat) => {
                if (cat.items && Array.isArray(cat.items)) {
                    cat.items.forEach((item) => {
                        // Se asegura de convertir el _id a string
                        itemIdsEnDocumento.push(String(item._id));
                    });
                }
            });
        }
        // Consultar en la colección de ítems todos aquellos que NO se encuentren en itemIdsEnDocumento
        const itemsDisponibles = yield _Items_schemas_items__WEBPACK_IMPORTED_MODULE_3__["modelo"].find({ _id: { $nin: itemIdsEnDocumento } })
            .sort({ descripcion: 1 })
            .lean();
        res.json({ items: itemsDisponibles });
    }
    catch (error) {
        console.error('Error al obtener los ítems disponibles:', error);
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
}));
// items duplicado en documento (buscando por descripción)
router.get('/planillasED/:idPlanilla/items/existe', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { idPlanilla } = req.params;
        const { itemDesc } = req.query; // Cambiamos el nombre a itemDesc
        // Validar que se haya enviado el itemDesc y que sea una cadena
        if (!itemDesc || typeof itemDesc !== 'string') {
            return res.status(400).json({ message: 'El parámetro itemDesc es requerido y debe ser una cadena.' });
        }
        // Buscar la planilla por su ID
        const planilla = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findById(idPlanilla).lean();
        if (!planilla) {
            return res.status(404).json({ message: 'Planilla no encontrada.' });
        }
        // Recorrer todas las categorías y sus ítems para ver si alguno coincide con la descripción (comparación insensible a mayúsculas/minúsculas)
        let exists = false;
        if (planilla.categorias && Array.isArray(planilla.categorias)) {
            for (const categoria of planilla.categorias) {
                if (categoria.items && Array.isArray(categoria.items)) {
                    const found = categoria.items.some((item) => {
                        // Usamos toLowerCase y trim para comparar de forma más robusta
                        return item.descripcion && item.descripcion.toLowerCase().trim() === itemDesc.toLowerCase().trim();
                    });
                    if (found) {
                        exists = true;
                        break;
                    }
                }
            }
        }
        // Responder indicando si el ítem (por descripción) existe o no en el documento
        return res.json({ exists });
    }
    catch (error) {
        console.error('Error al verificar existencia del ítem en la planilla:', error);
        return res.status(500).json({ message: 'Error en el servidor.', error });
    }
}));
// Ruta para eliminar un ítem de una categoría dentro de un documento específico
router.delete('/eliminar-item', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { idDocumento, descripcionItem } = req.body;
        // Validar que se hayan enviado ambos parámetros
        if (!idDocumento || !descripcionItem) {
            return res.status(400).json({ message: "Se requieren idDocumento y descripcionItem" });
        }
        // Buscar el documento por id y eliminar el ítem de todas las categorías donde aparezca
        const resultado = yield _Schemas_PlanillaED__WEBPACK_IMPORTED_MODULE_2__["PlanillaEDModel"].findOneAndUpdate({ _id: idDocumento }, { $pull: { "categorias.$[].items": { descripcion: descripcionItem } } }, { new: true } // Devuelve el documento actualizado
        );
        // Si no se encontró el documento
        if (!resultado) {
            return res.status(404).json({ message: "Documento no encontrado" });
        }
        // Respuesta exitosa
        res.json({ message: "Ítem eliminado correctamente", resultado });
    }
    catch (error) {
        console.error("Error al eliminar ítem:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}));
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/backend/src/app/PlanillaED/Schemas/PlanillaED.ts":
/*!***************************************************************!*\
  !*** ./apps/backend/src/app/PlanillaED/Schemas/PlanillaED.ts ***!
  \***************************************************************/
/*! exports provided: PlanillaEDModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanillaEDModel", function() { return PlanillaEDModel; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const Schema = mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"];
// Esquema de la categoría, ahora incluye la descripción y los ítems con descripción y valor
const CategoriaSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'CategoriaItem', required: true },
    descripcion: { type: String, required: true },
    items: [{
            _id: { type: Schema.Types.ObjectId, ref: 'Item' },
            descripcion: { type: String, required: true },
            valor: { type: Number, required: true } // Valor del ítem
        }]
});
// Esquema para la planilla, incluyendo las categorías y los ítems con sus descripciones y valores
const PlanillaEDSchema = new Schema({
    fechaCreacion: { type: Date, required: true },
    descripcion: { type: String, required: true },
    idEfector: { type: Schema.Types.ObjectId, ref: 'Efector', required: true },
    idServicio: { type: Schema.Types.ObjectId, ref: 'Servicio', required: true },
    categorias: [CategoriaSchema] // Arreglo de categorías, que contiene ítems con descripciones y valores
});
// Exportar el modelo de Mongoose para la planilla
const PlanillaEDModel = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('PlanillaED', PlanillaEDSchema, 'planillaed');


/***/ }),

/***/ "./apps/backend/src/app/Servicios/Routes/Servicios.ts":
/*!************************************************************!*\
  !*** ./apps/backend/src/app/Servicios/Routes/Servicios.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Schemas/servicios */ "./apps/backend/src/app/Servicios/Schemas/servicios.ts");



const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/rmServicios', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const data = yield _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__["ServicioModel"].find().sort({ descripcion: 1 }); // 1 para orden ascendente
        res.json(data);
    }
    catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
}));
router.get('/rmServicios/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const id = req.params.id;
    const respuesta = yield _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__["ServicioModel"].findById(id);
    res.json(respuesta);
}));
//alta
router.post('/rmServicios', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        console.log('Solicitud POST recibida en /rmItems:', req.body); // Log de la solicitud recibida
        const newItems = yield _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__["ServicioModel"].create(req.body);
        res.json(newItems);
    }
    catch (error) {
        console.error('Error al crear el ítem:', error); // Log del error
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
//modificar
router.put('/rmServicios/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const nuevaDescripcion = req.body.descripcion; // Obtener la nueva descripción
        // Verificar si ya existe cualquier categoría con la misma descripción
        const categoriaExistente = yield _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__["ServicioModel"].findOne({ descripcion: nuevaDescripcion });
        // Si se encuentra una categoría con la misma descripción, devolver un error
        if (categoriaExistente) {
            return res.status(400).json({
                error: 'La descripción ya se encuentra registrada en otro documento.'
            });
        }
        // Proceder a la actualización ya que no se encontró ninguna categoría con esa descripción
        const respuesta = yield _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__["ServicioModel"].findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Si no se encuentra la categoría con el ID proporcionado
        if (!respuesta) {
            return res.status(404).json({ error: 'No se encontró la categoría para actualizar.' });
        }
        // Mostrar la respuesta en la consola
        console.log('Categoría actualizada:', respuesta);
        // Responder con la categoría actualizada
        res.json(respuesta);
    }
    catch (error) {
        // Manejo de errores generales
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
router.delete('/rsServicios/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const respuesta = yield _Schemas_servicios__WEBPACK_IMPORTED_MODULE_2__["ServicioModel"].findByIdAndDelete(id);
        if (respuesta) {
            res.json({ message: 'Documento eliminado correctamente' });
        }
        else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
// thunder   http://localhost:3000/api/rItems/
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/backend/src/app/Servicios/Schemas/servicios.ts":
/*!*************************************************************!*\
  !*** ./apps/backend/src/app/Servicios/Schemas/servicios.ts ***!
  \*************************************************************/
/*! exports provided: ServicioModel, ServicioSchema */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicioModel", function() { return ServicioModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicioSchema", function() { return ServicioSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const Schema = mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"];
const ServicioSchema = new Schema({
    nombre: { type: String, required: true }
});
const ServicioModel = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('Servicios', ServicioSchema, 'servicios');

/*

const schema = new mongoose.Schema({
    nombre: { type: String },

});

export const modelo = mongoose.model('servicios', schema, 'servicios');
*/


/***/ }),

/***/ "./apps/backend/src/app/application.ts":
/*!*********************************************!*\
  !*** ./apps/backend/src/app/application.ts ***!
  \*********************************************/
/*! exports provided: application, loadUserMiddleware, authenticate, checkPermission, getPermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "application", function() { return application; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadUserMiddleware", function() { return loadUserMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authenticate", function() { return authenticate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPermission", function() { return checkPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPermission", function() { return getPermission; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _andes_api_tool_build_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @andes/api-tool/build/bootstrap */ "@andes/api-tool/build/bootstrap");
/* harmony import */ var _andes_api_tool_build_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_andes_api_tool_build_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ "./apps/backend/src/environments/environment.ts");
/* harmony import */ var _andes_api_tool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @andes/api-tool */ "@andes/api-tool");
/* harmony import */ var _andes_api_tool__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_andes_api_tool__WEBPACK_IMPORTED_MODULE_3__);




const shiroTrie = __webpack_require__(/*! shiro-trie */ "shiro-trie");
const info = {
    name: 'evalauciones-de-personal',
    version: '1.0.0'
};
const port = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].port;
const host = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].host;
const key = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].key;
const application = new _andes_api_tool_build_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ApiBootstrap"](info, { port, host, key });
application.add(_andes_api_tool__WEBPACK_IMPORTED_MODULE_3__["apiOptionsMiddleware"]);
const loadUserMiddleware = function (req, res, next) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        // Esta resuelto así por un tema de circle dependecy.
        // [TODO] queda pendiente como relacionar el Bootstrap atomatico con el ResourceBase
        const { User } = __webpack_require__(/*! ./users/user.schema */ "./apps/backend/src/app/users/user.schema.ts");
        const userId = req.user.user_id;
        const user = yield User.findById(userId, {
            email: 1,
            nombre: 1,
            apellido: 1,
            documento: 1,
            permisos: 1
        });
        if (user) {
            req.user = user;
            req.user['usuario'] = {
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                documento: user.documento
            };
            return next();
        }
        else {
            return next(403);
        }
    });
};
const authenticate = () => {
    if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].key) {
        return [application.authenticate(), loadUserMiddleware];
    }
    else {
        // Bypass Auth
        return (req, res, next) => next();
    }
};
const checkPermission = (req, permiso) => {
    if (req.user && req.user.permisos) {
        const shiro = shiroTrie.new();
        shiro.add(req.user.permisos);
        return shiro.check(permiso);
    }
};
const getPermission = (req, permiso) => {
    if (req.user && req.user.permisos) {
        const shiro = shiroTrie.new();
        shiro.add(req.user.permisos);
        return shiro.permissions(permiso);
    }
};


/***/ }),

/***/ "./apps/backend/src/app/auth/auth.routes.ts":
/*!**************************************************!*\
  !*** ./apps/backend/src/app/auth/auth.routes.ts ***!
  \**************************************************/
/*! exports provided: AuthRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRouter", function() { return AuthRouter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../application */ "./apps/backend/src/app/application.ts");
/* harmony import */ var _users_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users/user.controller */ "./apps/backend/src/app/users/user.controller.ts");
/* harmony import */ var _services_mail_mail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/mail/mail */ "./apps/backend/src/app/services/mail/mail.ts");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);





const AuthRouter = _application__WEBPACK_IMPORTED_MODULE_1__["application"].router();
AuthRouter.get('/auth/prueba', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        return res.send('Primer llamado a la api');
    }
    catch (err) {
        return next(403);
    }
}));
AuthRouter.post('/auth/login', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const users = yield _users_user_controller__WEBPACK_IMPORTED_MODULE_2__["UsersCtr"].search({ email: email, active: true }, {}, req);
        if (users.length > 0) {
            const user = users[0];
            const match = yield user.comparePassword(password);
            if (match) {
                const session = new mongoose__WEBPACK_IMPORTED_MODULE_4__["Types"].ObjectId();
                const newToken = yield _application__WEBPACK_IMPORTED_MODULE_1__["application"].sign({
                    session_id: session.toHexString(),
                    user_id: user._id.toHexString()
                });
                return res.json({ token: newToken });
            }
        }
        return next(403);
    }
    catch (err) {
        return next(403);
    }
}));
AuthRouter.post('/auth/create', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    //   try {
    //       const createdUser = await UsersCtr.create(req.body, req);
    //       const data = {
    //           user: createdUser,
    //           url: `${environment.app_host}/auth/activacion-cuenta/${createdUser.validationToken}`,
    //           subject: 'Activación de cuenta'
    //        }
    //       await sendUserEmail(data, 'account-activation');
    //       return res.json({ status: 'ok' });
    //   } catch (err) {
    //       return next(403);
    //   }
}));
//AuthRouter.post('/auth/regenerate/:email', async (req: Request, res, next) => {
//      try {
//    const email = req.params.email;
//    const updatedUser = await UsersCtr.setNewToken(email, req);
//    const data = {
//        user: updatedUser,
//        url: `${environment.app_host}/auth/regenerate-password/${updatedUser.validationToken}`,
//        subject: 'Regenerar contraseña'
//    }
//    await sendUserEmail(data, 'password-reset');
//    return res.json({ status: 'ok' });
//} catch (err) {
//   return next(403);
//}
//});
AuthRouter.post('/auth/suggestions', _application__WEBPACK_IMPORTED_MODULE_1__["application"].authenticate(), (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        yield Object(_services_mail_mail__WEBPACK_IMPORTED_MODULE_3__["sendAdminEmail"])(req.body);
        return res.json({ status: 'ok' });
    }
    catch (err) {
        return next(403);
    }
}));
//AuthRouter.post('/auth/validate/:token', async (req: Request, res, next) => {
//    try {
//        const token = req.params.token;
//        await UsersCtr.validateUser(token, req);
//        return res.json({ status: 'ok' });
//    } catch (err) {
//        return next(403);
//    }
//});
AuthRouter.post('/auth/resetPassword', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { password, validationToken } = req.body;
        const users = yield _users_user_controller__WEBPACK_IMPORTED_MODULE_2__["UsersCtr"].search({ validationToken: validationToken, active: true }, {}, req);
        if (users.length > 0) {
            yield _users_user_controller__WEBPACK_IMPORTED_MODULE_2__["UsersCtr"].update(users[0].id, { password, validationToken: null }, req);
            return res.json({ status: 'ok' });
        }
        else {
            return res.json({ status: 404 });
        }
    }
    catch (err) {
        return next(403);
    }
}));
AuthRouter.post('/auth/updatePassword', _application__WEBPACK_IMPORTED_MODULE_1__["application"].authenticate(), (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const { password, user_id } = req.body;
        const user = yield _users_user_controller__WEBPACK_IMPORTED_MODULE_2__["UsersCtr"].findById(user_id, {});
        if (user) {
            yield _users_user_controller__WEBPACK_IMPORTED_MODULE_2__["UsersCtr"].update(user.id, { password }, req);
            return res.json({ status: 'ok' });
        }
        else {
            return res.json({ status: 404 });
        }
    }
    catch (err) {
        return next(403);
    }
}));
AuthRouter.get('/auth/session', _application__WEBPACK_IMPORTED_MODULE_1__["application"].authenticate(), (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const user_id = req.user.user_id;
        const user = yield _users_user_controller__WEBPACK_IMPORTED_MODULE_2__["UsersCtr"].findById(user_id, { fields: 'nombre apellido telefono email documento permisos active' });
        res.json(user);
    }
    catch (err) {
        return next(403);
    }
}));


/***/ }),

/***/ "./apps/backend/src/app/categoriaitems/routes/categoriaItems.ts":
/*!**********************************************************************!*\
  !*** ./apps/backend/src/app/categoriaitems/routes/categoriaItems.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schemas/categoriaItems */ "./apps/backend/src/app/categoriaitems/schemas/categoriaItems.ts");



// import { application } from '../../application';
const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/rmCategoriaItems', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        //  console.log('pepe');
        const data = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].find().sort({ descripcion: 1 }); // 1 para orden ascendente
        //  console.log('data dpepe', data);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}));
/*
router.get('/rmCategoriaItems/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await modelo.findById(id);
        if (!respuesta) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        res.json(respuesta);
    } catch (error) {
        console.error('Error al obtener el documento:', error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});
*/
// Ver si la descripción existe en cualquier categoría
//router.get('/rmCategoriaItems/verificar-descripcion/:descripcion', async (req, res) => {
//   const descripcion = req.params.descripcion;
// Buscar una categoría con la misma descripción
//  const categoria = await modelo.findOne({ descripcion: descripcion });
//if (categoria) {
//  res.json(false); // La descripción ya existe
//} else {
//    res.json(true);  // La descripción es única
//}
//});
//es con console logaion 
//ver este
router.post('/rCategoriaItems', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const newItems = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].create(req.body);
        res.json(newItems);
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
//post arrays
router.post('/rCategoriaItems', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        // Verificar si     req.body es un array
        if (Array.isArray(req.body)) {
            const newItems = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].insertMany(req.body);
            res.json(newItems);
        }
        else {
            const newItem = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].create(req.body);
            res.json(newItem);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
router.put('/rCategoriaItems/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const nuevaDescripcion = req.body.descripcion; // Obtener la nueva descripción
        // Verificar si ya existe cualquier categoría con la misma descripción
        const categoriaExistente = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].findOne({ descripcion: nuevaDescripcion });
        // Si se encuentra una categoría con la misma descripción, devolver un error
        if (categoriaExistente) {
            return res.status(400).json({
                error: 'La descripción ya se encuentra registrada en otro documento.'
            });
        }
        // Proceder a la actualización ya que no se encontró ninguna categoría con esa descripción
        const respuesta = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Si no se encuentra la categoría con el ID proporcionado
        if (!respuesta) {
            return res.status(404).json({ error: 'No se encontró la categoría para actualizar.' });
        }
        // Mostrar la respuesta en la consola
        console.log('Categoría actualizada:', respuesta);
        // Responder con la categoría actualizada
        res.json(respuesta);
    }
    catch (error) {
        // Manejo de errores generales
        console.error('Error en la actualización:', error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
/*

// Ruta PATCH para actualizar parcialmente un documento
router.patch('/rCategoriaItems/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const actualizacion = req.body;
        const opciones = { new: true }; // Para devolver el documento actualizado
        //const respuesta = await modelo.findByIdAndUpdate(id, actualizacion, opciones);
        const respuesta = await modelo.findByIdAndUpdate(_id, actualizacion, opciones);
        if (respuesta) {
            res.json(respuesta);
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
});
*/
router.delete('/rCategoriaItems/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const respuesta = yield _schemas_categoriaItems__WEBPACK_IMPORTED_MODULE_2__["CategoriaItemModel"].findByIdAndDelete(id);
        if (respuesta) {
            res.json({ message: 'Documento eliminado correctamente' });
        }
        else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
// thunder   http://localhost:3000/api/rCategoriaItems/
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/backend/src/app/categoriaitems/schemas/categoriaItems.ts":
/*!***********************************************************************!*\
  !*** ./apps/backend/src/app/categoriaitems/schemas/categoriaItems.ts ***!
  \***********************************************************************/
/*! exports provided: CategoriaItemModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriaItemModel", function() { return CategoriaItemModel; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const Schema = mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"];
// Crear el esquema para los ítems (referencia al modelo Item)
const CategoriaItemSchema = new Schema({
    descripcion: { type: String, required: true },
    items: [{
            _id: { type: Schema.Types.ObjectId, ref: 'Item' },
            descripcion: { type: String, required: true },
            valor: { type: Number, required: true } // Valor del ítem
        }]
});
// Crear y exportar el modelo de Mongoose para CategoriaItem
const CategoriaItemModel = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('CategoriaItem', CategoriaItemSchema, 'categoriaitems');


/***/ }),

/***/ "./apps/backend/src/app/connection.ts":
/*!********************************************!*\
  !*** ./apps/backend/src/app/connection.ts ***!
  \********************************************/
/*! exports provided: Connections */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connections", function() { return Connections; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debug */ "debug");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ "./apps/backend/src/environments/environment.ts");



function schemaDefaults(schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false
    });
}
class Connections {
    /**
     * Inicializa las conexiones a MongoDB
     *
     * @static
     *
     * @memberOf Connections
     */
    static initialize() {
        // Configura Mongoose
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mongoose__WEBPACK_IMPORTED_MODULE_0__["Promise"] = global.Promise;
        mongoose__WEBPACK_IMPORTED_MODULE_0__["plugin"](schemaDefaults);
        // Configura logger de consultas
        const queryLogger = debug__WEBPACK_IMPORTED_MODULE_1__('mongoose');
        if (queryLogger.enabled) {
            mongoose__WEBPACK_IMPORTED_MODULE_0__["set"]('debug', (collection, method, query, arg1, arg2, arg3) => queryLogger('%s.%s(%o) %s %s', collection, method, query, arg2 || '', arg3 || ''));
        }
        // Conecta y configura conexiones
        // 1. PRINCIPAL
        mongoose__WEBPACK_IMPORTED_MODULE_0__["connect"](_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].mongo_host, {
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500
        });
        this.main = mongoose__WEBPACK_IMPORTED_MODULE_0__["connection"];
        // Configura eventos
        this.configEvents('main', this.main);
    }
    static configEvents(name, connection) {
        const connectionLog = debug__WEBPACK_IMPORTED_MODULE_1__(`mongoose: ${name}`);
        connection.on('connecting', () => connectionLog('connecting ...'));
        connection.on('error', error => connectionLog(`error: ${error}`));
        connection.on('connected', () => connectionLog('connected'));
        connection.on('reconnected', () => connectionLog('reconnected'));
        connection.on('disconnected', () => connectionLog('disconnected'));
    }
}


/***/ }),

/***/ "./apps/backend/src/app/eDesempeno/routes/configEvaDesemp.ts":
/*!*******************************************************************!*\
  !*** ./apps/backend/src/app/eDesempeno/routes/configEvaDesemp.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schemas/configEvaDesemp */ "./apps/backend/src/app/eDesempeno/schemas/configEvaDesemp.ts");



// import { application } from '../../application';
const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/rEvaDesemp', (req, res, next) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const data = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].find();
    res.json(data);
    res.send("hola");
}));
router.get('/rEvaDesemp/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const id = req.params.id;
    const respuesta = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].findById(id);
    res.json(respuesta);
}));
router.post('/rEvaDesemp', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const newItems = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].create(req.body);
        res.json(newItems);
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
//post arrays
router.post('/rEvaDesemp', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        // Verificar si     req.body es un array
        if (Array.isArray(req.body)) {
            const newItems = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].insertMany(req.body);
            res.json(newItems);
        }
        else {
            const newItem = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].create(req.body);
            res.json(newItem);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
// post arrays
router.put('/rEvaDesemp/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const respuesta = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].findByIdAndUpdate(id, req.body);
        res.json(respuesta);
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
// Ruta PATCH para actualizar parcialmente un documento
//pach 2
router.delete('/rEvaDesemp/:id', (req, res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const respuesta = yield _schemas_configEvaDesemp__WEBPACK_IMPORTED_MODULE_2__["modelo"].findByIdAndDelete(id);
        if (respuesta) {
            res.json({ message: 'Documento eliminado correctamente' });
        }
        else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
}));
// thunder   http://localhost:3000/api/rEvaDesemp/
//put modificaar
//router.post('/items', (req, res) => {
//    const newItem = req.body; // El nuevo item se espera en el cuerpo de la solicitud
//    items.pucategoriaitemssh(newItem);
//    res.status(201).json(newItem); // Responder con el item creado y un código de estado 201
//});
/* harmony default export */ __webpack_exports__["default"] = (router);


/***/ }),

/***/ "./apps/backend/src/app/eDesempeno/schemas/configEvaDesemp.ts":
/*!********************************************************************!*\
  !*** ./apps/backend/src/app/eDesempeno/schemas/configEvaDesemp.ts ***!
  \********************************************************************/
/*! exports provided: modelo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modelo", function() { return modelo; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const schema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    descripcion: { type: String },
    valor: { type: Number },
    idCategoriaItems: { type: mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"].Types.ObjectId }
});
const modelo = mongoose__WEBPACK_IMPORTED_MODULE_0__["model"]('configEvaDesemp', schema, 'edItems');
//                                   este formulario             tabla o collection


/***/ }),

/***/ "./apps/backend/src/app/services/mail/mail.ts":
/*!****************************************************!*\
  !*** ./apps/backend/src/app/services/mail/mail.ts ***!
  \****************************************************/
/*! exports provided: sendMail, registerPartialTemplate, renderHTML, sendUserEmail, sendAdminEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMail", function() { return sendMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerPartialTemplate", function() { return registerPartialTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderHTML", function() { return renderHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendUserEmail", function() { return sendUserEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendAdminEmail", function() { return sendAdminEmail; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment */ "./apps/backend/src/environments/environment.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);



const path = __webpack_require__(/*! path */ "path");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
const handlebars = __webpack_require__(/*! handlebars */ "handlebars");
function sendMail(options) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        const mailOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        };
        try {
            const transporter = yield nodemailer.createTransport({
                host: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].mail.host,
                port: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].mail.port,
                secure: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].mail.secure,
                auth: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].mail.auth
            });
            return yield transporter.sendMail(mailOptions);
        }
        catch (err) {
            return err;
        }
    });
}
function registerPartialTemplate(name) {
    const filePath = path.join(process.cwd(), `apps/backend/src/app/templates/email/${name}.html`);
    const file = fs__WEBPACK_IMPORTED_MODULE_2__["readFileSync"](filePath);
    handlebars.registerPartial('partial', file.toString());
}
function renderHTML(templateName, extras) {
    const TEMPLATE_PATH = 'apps/backend/src/app/templates/email/';
    const url = path.join(process.cwd(), TEMPLATE_PATH, templateName);
    const html = fs__WEBPACK_IMPORTED_MODULE_2__["readFileSync"](url, { encoding: 'utf-8' });
    try {
        const template = handlebars.compile(html);
        const htmlToSend = template(extras);
        return htmlToSend;
    }
    catch (exp) {
        return exp;
    }
}
// Emails a usuarios
function sendUserEmail(data, tipo) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        const handlebarsData = {
            titulo: data.subject,
            usuario: data.user,
            url: data.url,
        };
        // Registra el template parcial de handlebars
        registerPartialTemplate(tipo);
        const html = yield renderHTML('layout.html', handlebarsData);
        const mail = {
            from: `"Evalauciones de personal" <${_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].mail.auth.user}>`,
            to: handlebarsData.usuario.email,
            subject: handlebarsData.titulo,
            html
        };
        return sendMail(mail);
    });
}
// Emails de sistema
function sendAdminEmail(body) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        const handlebarsData = {
            titulo: 'Preguntas y sugerencias',
            tipo: body.tipo,
            usuario: body.user,
            contenido: body.contenido,
        };
        // Registra el template parcial de handlebars
        registerPartialTemplate('user-suggestions');
        const html = yield renderHTML('layout.html', handlebarsData);
        const mail = {
            from: `"Evalauciones de personal" <${handlebarsData.usuario.email}>`,
            to: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].mail.auth.user,
            subject: handlebarsData.titulo,
            html
        };
        return sendMail(mail);
    });
}
;


/***/ }),

/***/ "./apps/backend/src/app/users/user.controller.ts":
/*!*******************************************************!*\
  !*** ./apps/backend/src/app/users/user.controller.ts ***!
  \*******************************************************/
/*! exports provided: UsersCtr, UsersRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersCtr", function() { return UsersCtr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersRouter", function() { return UsersRouter; });
/* harmony import */ var _andes_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @andes/core */ "@andes/core");
/* harmony import */ var _andes_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_andes_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user.schema */ "./apps/backend/src/app/users/user.schema.ts");


class UsersResource extends _andes_core__WEBPACK_IMPORTED_MODULE_0__["ResourceBase"] {
    constructor() {
        super(...arguments);
        this.Model = _user_schema__WEBPACK_IMPORTED_MODULE_1__["User"];
        this.resourceName = 'users';
        this.resourceModule = 'auth';
        this.middlewares = [];
        this.searchFileds = {
            apellido: _andes_core__WEBPACK_IMPORTED_MODULE_0__["MongoQuery"].partialString,
            nombre: _andes_core__WEBPACK_IMPORTED_MODULE_0__["MongoQuery"].partialString,
            documento: _andes_core__WEBPACK_IMPORTED_MODULE_0__["MongoQuery"].partialString,
            validationToken: _andes_core__WEBPACK_IMPORTED_MODULE_0__["MongoQuery"].equalMatch,
            active: _andes_core__WEBPACK_IMPORTED_MODULE_0__["MongoQuery"].equalMatch,
            email: _andes_core__WEBPACK_IMPORTED_MODULE_0__["MongoQuery"].partialString,
            search: ['apellido', 'nombre', 'documento', 'email'],
        };
        //   async validateUser(token: string, req: Request) {
        //     const users = await this.search({ validationToken: token, active: false }, {}, req);
        //     if (users.length > 0) {
        //       const user = users[0];
        //       const data = { validationToken: null, active: true };
        //       return await this.update(user._id, data, req);
        //     }
        //     throw new ResourceNotFound();
        //   }
        //   async setNewToken(email: string, req: Request) {
        //     const users = await this.search({ email, active: true }, {}, req);
        //     if (users.length > 0) {
        //       const user = users[0];
        //       const data = { validationToken: new mongoose.Types.ObjectId().toHexString() };
        //       return await this.update(user._id, data, req);
        //     }
        //   }
    }
}
const UsersCtr = new UsersResource();
const UsersRouter = UsersCtr.makeRoutes();


/***/ }),

/***/ "./apps/backend/src/app/users/user.schema.ts":
/*!***************************************************!*\
  !*** ./apps/backend/src/app/users/user.schema.ts ***!
  \***************************************************/
/*! exports provided: UsersSchema, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersSchema", function() { return UsersSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);


const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
// eslint-disable-next-line no-useless-escape
const EMAILRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UsersSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    active: { type: Boolean, default: false },
    nombre: String,
    apellido: String,
    documento: String,
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: EMAILRegexp,
        index: { unique: true }
    },
    telefono: String,
    password: String,
    permisos: [String],
    validationToken: String,
    disclaimers: [{
            createdAt: Date,
            _id: {
                type: mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"].Types.ObjectId,
                ref: 'dislaimer'
            }
        }]
});
UsersSchema.pre('save', function (next) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        const SALT_FACTOR = 5;
        if (this.isNew) {
            this.validationToken = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Types"].ObjectId().toHexString();
        }
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt.genSalt(SALT_FACTOR);
            const hash = yield bcrypt.hash(this.password, salt, null);
            this.password = hash;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
UsersSchema.methods.comparePassword = function (passwordAttempt) {
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
        return yield bcrypt.compare(passwordAttempt, this.password);
    });
};
const User = mongoose__WEBPACK_IMPORTED_MODULE_1__["model"]('users', UsersSchema, 'users');


/***/ }),

/***/ "./apps/backend/src/environments/environment.ts":
/*!******************************************************!*\
  !*** ./apps/backend/src/environments/environment.ts ***!
  \******************************************************/
/*! exports provided: environment, jobs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jobs", function() { return jobs; });
const environment = {
    production: false,
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    google_map_key: process.env.GOOGLE_KEY || 'unacalve',
    app_host: process.env.APP_HOST || '',
    key: process.env.JWT_KEY || null,
    mongo_host: process.env.MONGO_HOST || 'mongodb://localhost:27017/evaluaciones-de-personal',
    logDatabase: {
        log: {
            host: process.env.MONGO_LOGS || 'mongodb://localhost:27017/evalauciones-logs',
            options: {
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1500,
                useNewUrlParser: true
            }
        }
    },
    mail: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER || 'mail@mail.gob.ar',
            pass: process.env.MAIL_PASSWORD || 'somePass'
        }
    }
};
const jobs = [];


/***/ }),

/***/ "./apps/backend/src/main.ts":
/*!**********************************!*\
  !*** ./apps/backend/src/main.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_eDesempeno_routes_configEvaDesemp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/eDesempeno/routes/configEvaDesemp */ "./apps/backend/src/app/eDesempeno/routes/configEvaDesemp.ts");
/* harmony import */ var _app_categoriaitems_routes_categoriaItems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/categoriaitems/routes/categoriaItems */ "./apps/backend/src/app/categoriaitems/routes/categoriaItems.ts");
/* harmony import */ var _app_Items_routes_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/Items/routes/items */ "./apps/backend/src/app/Items/routes/items.ts");
/* harmony import */ var _app_Efectores_Routes_efectores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/Efectores/Routes/efectores */ "./apps/backend/src/app/Efectores/Routes/efectores.ts");
/* harmony import */ var _app_Servicios_Routes_Servicios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/Servicios/Routes/Servicios */ "./apps/backend/src/app/Servicios/Routes/Servicios.ts");
/* harmony import */ var _app_PlanillaED_Router_PlanillaED__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/PlanillaED/Router/PlanillaED */ "./apps/backend/src/app/PlanillaED/Router/PlanillaED.ts");
//import EdItemsRouter from './app/eDesempeno/routes/configEvaDesemp';






__webpack_require__(/*! dotenv */ "dotenv").config();
const { Connections } = __webpack_require__(/*! ./app/connection */ "./apps/backend/src/app/connection.ts");
const { application } = __webpack_require__(/*! ./app/application */ "./apps/backend/src/app/application.ts");
Connections.initialize();
// Constantes
const UsersRouter = __webpack_require__(/*! ./app/users/user.controller */ "./apps/backend/src/app/users/user.controller.ts").UsersRouter;
const AuthRouter = __webpack_require__(/*! ./app/auth/auth.routes */ "./apps/backend/src/app/auth/auth.routes.ts").AuthRouter;
// Rutas
application.add({ path: '/api', router: UsersRouter });
application.add({ path: '/api', router: _app_eDesempeno_routes_configEvaDesemp__WEBPACK_IMPORTED_MODULE_0__["default"] });
application.add({ path: '/api', router: _app_Items_routes_items__WEBPACK_IMPORTED_MODULE_2__["default"] });
application.add({ path: '/api', router: _app_Efectores_Routes_efectores__WEBPACK_IMPORTED_MODULE_3__["default"] });
application.add({ path: '/api', router: _app_Servicios_Routes_Servicios__WEBPACK_IMPORTED_MODULE_4__["default"] });
application.add({ path: '/api', router: _app_PlanillaED_Router_PlanillaED__WEBPACK_IMPORTED_MODULE_5__["default"] });
application.add({ path: '/api', router: _app_categoriaitems_routes_categoriaItems__WEBPACK_IMPORTED_MODULE_1__["default"] });
application.add({ path: '/api', router: AuthRouter });
application.router();
application.start();


/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./apps/backend/src/main.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/andes/sistemas/EvaluacionDesempeño/evaluaciondepersonal/apps/backend/src/main.ts */"./apps/backend/src/main.ts");


/***/ }),

/***/ "@andes/api-tool":
/*!**********************************!*\
  !*** external "@andes/api-tool" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@andes/api-tool");

/***/ }),

/***/ "@andes/api-tool/build/bootstrap":
/*!**************************************************!*\
  !*** external "@andes/api-tool/build/bootstrap" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@andes/api-tool/build/bootstrap");

/***/ }),

/***/ "@andes/core":
/*!******************************!*\
  !*** external "@andes/core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@andes/core");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "shiro-trie":
/*!*****************************!*\
  !*** external "shiro-trie" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shiro-trie");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map
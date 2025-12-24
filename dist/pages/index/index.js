"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./src/pages/index/index.tsx":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./src/pages/index/index.tsx ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Index; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./src/types.ts");
/* harmony import */ var _constants_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/icons */ "./src/constants/icons.ts");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/common */ "./src/utils/common.ts");
/* harmony import */ var _components_InventoryItemCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/InventoryItemCard */ "./src/components/InventoryItemCard.tsx");
/* harmony import */ var _components_AddItemModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/AddItemModal */ "./src/components/AddItemModal.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);










const STORAGE_KEY = 'smart-fridge-inventory-v2';
function Index() {
  const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [filterCategory, setFilterCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('ALL');
  const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [showTrash, setShowTrash] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // 加载数据
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    try {
      const saved = _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().getStorageSync(STORAGE_KEY);
      if (saved && saved.length > 0) {
        setItems(saved);
      } else {
        setItems([{
          id: '1',
          name: '全脂牛奶',
          quantity: 1,
          unit: 'L',
          category: _types__WEBPACK_IMPORTED_MODULE_2__.Category.OTHER,
          addedDate: new Date(Date.now() - 86400000 * 1).toISOString(),
          isDeleted: false
        }, {
          id: '2',
          name: '基围虾',
          quantity: 20,
          unit: '只',
          category: _types__WEBPACK_IMPORTED_MODULE_2__.Category.SEAFOOD,
          addedDate: new Date(Date.now() - 86400000 * 0).toISOString(),
          isDeleted: false
        }, {
          id: '3',
          name: '上海青',
          quantity: 3,
          unit: '把',
          category: _types__WEBPACK_IMPORTED_MODULE_2__.Category.VEGETABLE,
          addedDate: new Date(Date.now() - 86400000 * 4).toISOString(),
          isDeleted: false
        }, {
          id: '4',
          name: '澳洲牛排',
          quantity: 2,
          unit: '块',
          category: _types__WEBPACK_IMPORTED_MODULE_2__.Category.MEAT,
          addedDate: new Date(Date.now() - 86400000 * 8).toISOString(),
          isDeleted: false
        }]);
      }
    } catch (e) {
      console.error("Failed to load inventory", e);
    }
  }, []);

  // 保存数据
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().setStorageSync(STORAGE_KEY, items);
  }, [items]);
  const handleAddItem = newItem => {
    const item = {
      ...newItem,
      id: (0,_utils_common__WEBPACK_IMPORTED_MODULE_7__.generateId)(),
      addedDate: new Date().toISOString(),
      isDeleted: false
    };
    setItems(prev => [item, ...prev]);
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '已添加',
      icon: 'success'
    });
  };
  const moveToTrash = id => {
    setItems(prev => prev.map(item => item.id === id ? {
      ...item,
      isDeleted: true
    } : item));
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '已回收',
      icon: 'none'
    });
  };
  const restoreFromTrash = id => {
    setItems(prev => prev.map(item => item.id === id ? {
      ...item,
      isDeleted: false
    } : item));
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
      title: '已恢复',
      icon: 'success'
    });
  };
  const deleteForever = id => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  const handleUpdateQuantity = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? {
          ...item,
          quantity: newQty
        } : item;
      }
      return item;
    }));
  };
  const filteredItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return items.filter(item => {
      if (showTrash) return item.isDeleted;
      if (item.isDeleted) return false;
      const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
  }, [items, filterCategory, searchTerm, showTrash]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
    className: "min-h-screen bg-_b_hF6F7FB_B pb-32 font-sans text-slate-900 animate-fade-in",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "bg-white sticky top-0 z-10 shadow-_b0_4px_20px_-4px_rgba_p0_m0_m0_m0_d03_P_B pb-2 rounded-b-_b32px_B",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "px-5 h-16 flex flex-row items-center justify-between mt-1",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "flex flex-row items-center gap-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            onClick: () => setShowTrash(false),
            className: `flex flex-row items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${!showTrash ? 'bg-slate-900 shadow-lg shadow-slate-200 scale-105' : 'bg-transparent'}`,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: !showTrash ? 'text-white font-bold text-lg' : 'text-slate-400 font-medium text-lg',
              children: "\u6211\u7684\u51B0\u7BB1"
            }), !showTrash && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
              className: "w-1_d5 h-1_d5 rounded-full bg-emerald-400"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            className: "w-_b1px_B h-4 bg-slate-200 mx-1"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            onClick: () => setShowTrash(true),
            className: `flex flex-row items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${showTrash ? 'bg-red-50 shadow-sm scale-105' : 'bg-transparent'}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: showTrash ? 'text-red-500 font-bold text-lg' : 'text-slate-400 font-medium text-lg',
              children: "\u56DE\u6536\u7AD9"
            })
          })]
        })
      }), !showTrash && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "px-5 mb-3 mt-1",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "bg-slate-100_f80 rounded-full px-4 py-2_d5 flex flex-row items-center w-full transition-all focus-within_cbg-white focus-within_cring-2 focus-within_cring-slate-900_f10 focus-within_cshadow-sm",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: "mr-2 text-sm opacity-50",
            children: _constants_icons__WEBPACK_IMPORTED_MODULE_3__.ICON_MAP.search
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Input, {
            className: "text-sm w-full h-full text-slate-800",
            placeholder: "\u641C\u7D22\u98DF\u6750...",
            placeholderClass: "text-slate-400",
            value: searchTerm,
            onInput: e => setSearchTerm(e.detail.value)
          })]
        })
      }), !showTrash && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.ScrollView, {
        scrollX: true,
        className: "whitespace-nowrap px-5 w-full no-scrollbar",
        showScrollbar: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: "flex flex-row gap-2 pb-2",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            onClick: () => setFilterCategory('ALL'),
            className: `px-5 py-2 rounded-full transition-all duration-300 border ${filterCategory === 'ALL' ? 'bg-slate-900 border-slate-900 shadow-md shadow-slate-200' : 'bg-white border-slate-100 text-slate-500'}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: `text-xs font-bold ${filterCategory === 'ALL' ? 'text-white' : 'text-slate-500'}`,
              children: "\u5168\u90E8"
            })
          }), Object.values(_types__WEBPACK_IMPORTED_MODULE_2__.Category).map(cat => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
            onClick: () => setFilterCategory(cat),
            className: `px-5 py-2 rounded-full transition-all duration-300 border ${filterCategory === cat ? 'bg-slate-900 border-slate-900 shadow-md shadow-slate-200' : 'bg-white border-slate-100'}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
              className: `text-xs font-bold ${filterCategory === cat ? 'text-white' : 'text-slate-500'}`,
              children: cat
            })
          }, cat))]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      className: "px-4 py-5",
      children: filteredItems.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
        className: "flex flex-col items-center justify-center py-32 text-center opacity-60",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
          className: `w-24 h-24 rounded-_b32px_B flex items-center justify-center mb-6 shadow-sm ${showTrash ? 'bg-red-50' : 'bg-white'}`,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
            className: "text-5xl opacity-80",
            children: showTrash ? _constants_icons__WEBPACK_IMPORTED_MODULE_3__.ICON_MAP.trash : _constants_icons__WEBPACK_IMPORTED_MODULE_3__.ICON_MAP.package
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "text-slate-400 font-medium text-sm mb-1",
          children: showTrash ? "回收站空空如也" : "冰箱里什么都没有"
        }), !showTrash && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
          className: "text-slate-300 text-xs",
          children: "\u70B9\u53F3\u4E0B\u89D2\u52A0\u70B9\u597D\u5403\u7684\u5427"
        })]
      }) : filteredItems.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_InventoryItemCard__WEBPACK_IMPORTED_MODULE_4__.InventoryItemCard, {
        item: item,
        showTrash: showTrash,
        onUpdateQuantity: handleUpdateQuantity,
        onMoveToTrash: moveToTrash,
        onRestore: restoreFromTrash,
        onDeleteForever: deleteForever
      }, item.id))
    }), !showTrash && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.View, {
      onClick: () => setIsModalOpen(true),
      className: "fixed bottom-10 right-6 w-16 h-16 bg-slate-900 rounded-_b24px_B shadow-xl shadow-slate-900_f30 flex items-center justify-center z-40 active_cscale-90 transition-transform duration-200",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_8__.Text, {
        className: "text-white text-3xl mb-1",
        children: _constants_icons__WEBPACK_IMPORTED_MODULE_3__.ICON_MAP.plus
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_AddItemModal__WEBPACK_IMPORTED_MODULE_5__.AddItemModal, {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      onAdd: handleAddItem
    })]
  });
}

/***/ }),

/***/ "./src/components/AddItemModal.tsx":
/*!*****************************************!*\
  !*** ./src/components/AddItemModal.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddItemModal: function() { return /* binding */ AddItemModal; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./src/types.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




function AddItemModal({
  isOpen,
  onClose,
  onAdd
}) {
  const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [quantity, setQuantity] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('1');
  const [unit, setUnit] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('个');
  const [category, setCategory] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_types__WEBPACK_IMPORTED_MODULE_1__.Category.OTHER);
  if (!isOpen) return null;
  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      name,
      quantity: parseFloat(quantity) || 1,
      unit,
      category
    });
    // 提交后重置表单
    setName('');
    setQuantity('1');
    setUnit('个');
    setCategory(_types__WEBPACK_IMPORTED_MODULE_1__.Category.OTHER);
    onClose();
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
    className: "fixed inset-0 z-50 flex items-center justify-center",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
      className: "absolute inset-0 bg-black_f50 transition-opacity",
      onClick: onClose
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
      className: "relative bg-white w-_b85_v_B rounded-3xl p-6 z-10 shadow-2xl",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
        className: "text-xl font-bold text-slate-900 mb-6 block text-center",
        children: "\u6DFB\u52A0\u65B0\u98DF\u6750"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "mb-4",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
          className: "text-xs text-slate-500 mb-2 block font-medium",
          children: "\u540D\u79F0"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Input, {
          className: "bg-slate-50 p-3 rounded-xl text-slate-800 text-base h-11",
          placeholder: "\u4F8B\u5982: \u9E21\u86CB",
          placeholderClass: "text-slate-400",
          value: name,
          onInput: e => setName(e.detail.value)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "flex flex-row gap-3 mb-5",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "flex-1",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "text-xs text-slate-500 mb-2 block font-medium",
            children: "\u6570\u91CF"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Input, {
            type: "digit",
            className: "bg-slate-50 p-3 rounded-xl text-slate-800 text-base h-11",
            value: quantity,
            onInput: e => setQuantity(e.detail.value)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "flex-1",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "text-xs text-slate-500 mb-2 block font-medium",
            children: "\u5355\u4F4D"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Input, {
            className: "bg-slate-50 p-3 rounded-xl text-slate-800 text-base h-11",
            value: unit,
            onInput: e => setUnit(e.detail.value)
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "mb-8",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
          className: "text-xs text-slate-500 mb-2 block font-medium",
          children: "\u5206\u7C7B"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "flex flex-row flex-wrap gap-2",
          children: Object.values(_types__WEBPACK_IMPORTED_MODULE_1__.Category).map(cat => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
            onClick: () => setCategory(cat),
            className: `px-3 py-1_d5 rounded-lg border transition-all ${category === cat ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
              className: `text-xs font-bold ${category === cat ? 'text-white' : 'text-slate-600'}`,
              children: cat
            })
          }, cat))
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "flex flex-row gap-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          onClick: onClose,
          className: "flex-1 bg-slate-100 h-12 rounded-xl flex items-center justify-center active_cbg-slate-200",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "text-slate-600 font-bold",
            children: "\u53D6\u6D88"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          onClick: handleSubmit,
          className: "flex-1 bg-slate-900 h-12 rounded-xl flex items-center justify-center active_cbg-slate-800",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "text-white font-bold",
            children: "\u4FDD\u5B58"
          })
        })]
      })]
    })]
  });
}

/***/ }),

/***/ "./src/components/InventoryItemCard.tsx":
/*!**********************************************!*\
  !*** ./src/components/InventoryItemCard.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InventoryItemCard: function() { return /* binding */ InventoryItemCard; }
/* harmony export */ });
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "./src/types.ts");
/* harmony import */ var _constants_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/icons */ "./src/constants/icons.ts");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);





function InventoryItemCard({
  item,
  showTrash,
  onUpdateQuantity,
  onMoveToTrash,
  onRestore,
  onDeleteForever
}) {
  const daysStored = (0,_utils_common__WEBPACK_IMPORTED_MODULE_3__.getDaysStored)(item.addedDate);
  const freshStatus = (0,_utils_common__WEBPACK_IMPORTED_MODULE_3__.getFreshnessColor)(daysStored);

  // 🎨 UI升级：低饱和度莫兰迪色系
  // 背景使用最淡的 50，图标使用 500 或自定义 hex，避免高对比度
  const getCategoryTheme = cat => {
    switch (cat) {
      case _types__WEBPACK_IMPORTED_MODULE_0__.Category.MEAT:
        // 肉类：淡粉红背景 + 柔和红图标
        return {
          icon: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.meat,
          bg: 'bg-red-50',
          text: 'text-red-400'
        };
      case _types__WEBPACK_IMPORTED_MODULE_0__.Category.VEGETABLE:
        // 蔬菜：淡绿背景 + 森林绿图标
        return {
          icon: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.vegetable,
          bg: 'bg-green-50',
          text: 'text-green-500'
        };
      case _types__WEBPACK_IMPORTED_MODULE_0__.Category.FRUIT:
        // 水果：淡橙背景 + 暖橙图标
        return {
          icon: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.fruit,
          bg: 'bg-orange-50',
          text: 'text-orange-400'
        };
      case _types__WEBPACK_IMPORTED_MODULE_0__.Category.SEAFOOD:
        // 海鲜：淡蓝背景 + 天空蓝图标
        return {
          icon: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.seafood,
          bg: 'bg-sky-50',
          text: 'text-sky-500'
        };
      default:
        // 其他：淡灰背景 + 灰色图标
        return {
          icon: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.package,
          bg: 'bg-slate-50',
          text: 'text-slate-400'
        };
    }
  };
  const theme = getCategoryTheme(item.category);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
    className: "bg-white p-4 rounded-_b24px_B shadow-_b0_2px_15px_rgba_p0_m0_m0_m0_d02_P_B mb-3 flex flex-row items-center justify-between gap-3 active_cscale-_b0_d99_B transition-transform duration-200 border border-slate-50",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
      className: "flex flex-row items-center gap-3 flex-1 min-w-0",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: `w-14 h-14 rounded-_b20px_B flex items-center justify-center flex-shrink-0 ${theme.bg}`,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
          className: `text-2xl ${theme.text}`,
          children: theme.icon
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: "flex-1 min-w-0",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
          className: "font-bold text-slate-700 text-lg leading-tight block mb-1_d5 truncate",
          children: item.name
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "flex flex-row items-center gap-2 flex-wrap",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
            className: "text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-lg",
            children: (0,_utils_common__WEBPACK_IMPORTED_MODULE_3__.formatDate)(item.addedDate)
          }), !showTrash && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
            className: `px-2 py-1 rounded-lg ${freshStatus.bg}`,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
              className: `text-xs font-medium ${freshStatus.text}`,
              children: [daysStored, " \u5929"]
            })
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
      className: "flex flex-row items-center pl-1 flex-shrink-0",
      children: showTrash ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: "flex flex-row gap-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          onClick: e => {
            e.stopPropagation();
            onRestore(item.id);
          },
          className: "w-10 h-10 rounded-full bg-green-50 flex items-center justify-center active_cscale-90",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
            className: "text-sm",
            children: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.restore
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          onClick: e => {
            e.stopPropagation();
            onDeleteForever(item.id);
          },
          className: "w-10 h-10 rounded-full bg-red-50 flex items-center justify-center active_cscale-90",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
            className: "text-sm",
            children: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.deleteForever
          })
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: "flex flex-row items-center gap-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "flex flex-row items-center bg-white rounded-full p-1 h-9 border border-slate-100 shadow-sm",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
            onClick: e => {
              e.stopPropagation();
              onUpdateQuantity(item.id, -1);
            },
            className: "w-7 h-full flex items-center justify-center rounded-full active_cbg-slate-50",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
              className: "text-slate-300 font-bold text-sm mb-_b2px_B",
              children: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.subtract
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
            className: "w-8 flex items-center justify-center",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
              className: "font-bold text-slate-700 text-sm",
              children: item.quantity
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
            onClick: e => {
              e.stopPropagation();
              onUpdateQuantity(item.id, 1);
            },
            className: "w-7 h-full flex items-center justify-center rounded-full active_cbg-slate-50",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
              className: "text-slate-300 font-bold text-sm mb-_b2px_B",
              children: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.add
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
          className: "text-sm font-medium text-slate-400 w-6 text-center",
          children: item.unit
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          onClick: e => {
            e.stopPropagation();
            onMoveToTrash(item.id);
          },
          className: "w-8 h-8 flex items-center justify-center rounded-full text-slate-300 active_ctext-red-400 transition-colors",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
            className: "text-sm opacity-50",
            children: _constants_icons__WEBPACK_IMPORTED_MODULE_1__.ICON_MAP.trash
          })
        })]
      })
    })]
  });
}

/***/ }),

/***/ "./src/constants/icons.ts":
/*!********************************!*\
  !*** ./src/constants/icons.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICON_MAP: function() { return /* binding */ ICON_MAP; }
/* harmony export */ });
const ICON_MAP = {
  refrigerator: '🧊',
  // 冰箱
  trash: '🗑️',
  // 垃圾桶/回收站
  search: '🔍',
  // 搜索
  plus: '➕',
  // 添加
  restore: '↩️',
  // 恢复
  deleteForever: '❌',
  // 彻底删除
  meat: '🥩',
  // 肉类
  vegetable: '🥬',
  // 蔬菜
  fruit: '🍒',
  // 水果
  seafood: '🦐',
  // 海鲜
  other: '📦',
  // 其他
  package: '🥡',
  // 默认包装
  add: '➕',
  subtract: '➖'
};

/***/ }),

/***/ "./src/pages/index/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/index/index.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/index/index!./src/pages/index/index.tsx");


var config = {"navigationBarTitleText":"首页"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/index/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_index_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Category: function() { return /* binding */ Category; }
/* harmony export */ });
let Category = /*#__PURE__*/function (Category) {
  Category["MEAT"] = "\u8089\u7C7B";
  Category["VEGETABLE"] = "\u852C\u83DC";
  Category["FRUIT"] = "\u6C34\u679C";
  Category["SEAFOOD"] = "\u6D77\u9C9C";
  Category["OTHER"] = "\u5176\u4ED6";
  return Category;
}({});

/***/ }),

/***/ "./src/utils/common.ts":
/*!*****************************!*\
  !*** ./src/utils/common.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDate: function() { return /* binding */ formatDate; },
/* harmony export */   generateId: function() { return /* binding */ generateId; },
/* harmony export */   getDaysStored: function() { return /* binding */ getDaysStored; },
/* harmony export */   getFreshnessColor: function() { return /* binding */ getFreshnessColor; }
/* harmony export */ });
// 1. 生成简单 ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// 2. 计算存储天数
const getDaysStored = dateStr => {
  const added = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - added.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// 3. 格式化日期 (YYYYMMDD)
const formatDate = dateStr => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

// 4. 获取新鲜度颜色 (🎨 调色板优化：更柔和的低饱和度配色)
const getFreshnessColor = days => {
  if (days <= 3) {
    // 新鲜：由原来的 Emerald 改为更自然的 Green，字色变深一点点以保证清晰度，背景极淡
    return {
      bg: 'bg-_b_hF0FDF4_B',
      text: 'text-_b_h166534_B',
      border: 'border-green-100',
      label: '新鲜'
    };
  }
  if (days <= 7) {
    // 良：由 Amber 改为 Orange，去掉了刺眼的黄色感
    return {
      bg: 'bg-_b_hFFF7ED_B',
      text: 'text-_b_h9A3412_B',
      border: 'border-orange-100',
      label: '良'
    };
  }
  // 久置：由 Rose 改为 Slate/Red 混合，降低警示感，增加高级感
  return {
    bg: 'bg-_b_hFEF2F2_B',
    text: 'text-_b_h991B1B_B',
    border: 'border-red-100',
    label: '久置'
  };
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","common"], function() { return __webpack_exec__("./src/pages/index/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map
!(function (t, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = e())
		: 'function' == typeof define && define.amd
		? define(e)
		: ((t = 'undefined' != typeof globalThis ? globalThis : t || self).initGdalJs = e());
})(this, function () {
	'use strict';
	function e(r) {
		if (r.__esModule) return r;
		var n = Object.defineProperty({}, '__esModule', { value: !0 });
		return (
			Object.keys(r).forEach(function (t) {
				var e = Object.getOwnPropertyDescriptor(r, t);
				Object.defineProperty(
					n,
					t,
					e.get
						? e
						: {
								enumerable: !0,
								get: function () {
									return r[t];
								},
						  },
				);
			}),
			n
		);
	}
	var xr = e(Object.freeze({ __proto__: null, default: {} })),
		i =
			'[object process]' ===
			Object.prototype.toString.call('undefined' != typeof process ? process : 0);
	function r(e, t) {
		var r,
			n = Object.keys(e);
		return (
			Object.getOwnPropertySymbols &&
				((r = Object.getOwnPropertySymbols(e)),
				t &&
					(r = r.filter(function (t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable;
					})),
				n.push.apply(n, r)),
			n
		);
	}
	function s(n) {
		for (var t = 1; t < arguments.length; t++) {
			var a = null != arguments[t] ? arguments[t] : {};
			t % 2
				? r(Object(a), !0).forEach(function (t) {
						var e, r;
						(e = n),
							(r = a[(t = t)]),
							t in e
								? Object.defineProperty(e, t, {
										value: r,
										enumerable: !0,
										configurable: !0,
										writable: !0,
								  })
								: (e[t] = r);
				  })
				: Object.getOwnPropertyDescriptors
				? Object.defineProperties(n, Object.getOwnPropertyDescriptors(a))
				: r(Object(a)).forEach(function (t) {
						Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(a, t));
				  });
		}
		return n;
	}
	function Mr(t) {
		return (Mr =
			'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							'function' == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t;
				  })(t);
	}
	function k(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				'value' in n && (n.writable = !0),
				Object.defineProperty(t, n.key, n);
		}
	}
	function M(t, e) {
		return (
			(function (t) {
				if (Array.isArray(t)) return t;
			})(t) ||
			(function (t, e) {
				var r =
					null == t
						? null
						: ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
				if (null != r) {
					var n,
						a,
						i = [],
						o = !0,
						s = !1;
					try {
						for (
							r = r.call(t);
							!(o = (n = r.next()).done) && (i.push(n.value), !e || i.length !== e);
							o = !0
						);
					} catch (t) {
						(s = !0), (a = t);
					} finally {
						try {
							o || null == r.return || r.return();
						} finally {
							if (s) throw a;
						}
					}
					return i;
				}
			})(t, e) ||
			x(t, e) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function I(t) {
		return (
			(function (t) {
				if (Array.isArray(t)) return B(t);
			})(t) ||
			(function (t) {
				if (('undefined' != typeof Symbol && null != t[Symbol.iterator]) || null != t['@@iterator'])
					return Array.from(t);
			})(t) ||
			x(t) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
				);
			})()
		);
	}
	function x(t, e) {
		if (t) {
			if ('string' == typeof t) return B(t, e);
			var r = Object.prototype.toString.call(t).slice(8, -1);
			return 'Map' === (r = 'Object' === r && t.constructor ? t.constructor.name : r) || 'Set' === r
				? Array.from(t)
				: 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
				? B(t, e)
				: void 0;
		}
	}
	function B(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
		return n;
	}
	var Ir,
		t = { exports: {} },
		Br = e(Object.freeze({ __proto__: null, default: {} })),
		U = t;
	function K(k) {
		var M,
			I,
			x,
			B,
			U,
			K,
			z,
			u,
			W,
			Y,
			c = void 0 !== (k = k || {}) ? k : {};
		function V() {
			function n(t, e) {
				if (!t) throw e + new Error().stack;
			}
			function a(t, e, r) {
				(this.start = t), (this.end = e), (this.audio = r);
			}
			c.FS_createPath('/', 'usr', !0, !0),
				c.FS_createPath('/usr', 'share', !0, !0),
				c.FS_createPath('/usr/share', 'gdal', !0, !0),
				c.FS_createPath('/usr/share', 'proj', !0, !0),
				(a.prototype = {
					requests: {},
					open: function (t, e) {
						(this.name = e), (this.requests[e] = this), c.addRunDependency('fp ' + this.name);
					},
					send: function () {},
					onload: function () {
						var t = this.byteArray.subarray(this.start, this.end);
						this.finish(t);
					},
					finish: function (t) {
						c.FS_createDataFile(this.name, null, t, !0, !0, !0),
							c.removeRunDependency('fp ' + this.name),
							(this.requests[this.name] = null);
					},
				});
			for (var t = x.files, e = 0; e < t.length; ++e)
				new a(t[e].start, t[e].end, t[e].audio || 0).open('GET', t[e].filename);
			function r(t) {
				n(t, 'Loading data file failed.'),
					n(t instanceof ArrayBuffer, 'bad input to processPackageData');
				for (
					var t = new Uint8Array(t), e = ((a.prototype.byteArray = t), x.files), r = 0;
					r < e.length;
					++r
				)
					a.prototype.requests[e[r].filename].onload();
				c.removeRunDependency(
					'datafile_/home/bugra/Documents/MiniProject/gdal3.js/build/package/gdal3WebAssembly.data',
				);
			}
			c.addRunDependency(
				'datafile_/home/bugra/Documents/MiniProject/gdal3.js/build/package/gdal3WebAssembly.data',
			),
				c.preloadResults || (c.preloadResults = {}),
				(c.preloadResults[
					'/home/bugra/Documents/MiniProject/gdal3.js/build/package/gdal3WebAssembly.data'
				] = { fromCache: !1 }),
				Y ? (r(Y), (Y = null)) : (W = r);
		}
		(c.ready = new Promise(function (t, e) {
			(M = t), (I = e);
		})),
			c.expectedDataFileDownloads || (c.expectedDataFileDownloads = 0),
			c.expectedDataFileDownloads++,
			c.ENVIRONMENT_IS_PTHREAD ||
				((x = {
					files: [
						{ filename: '/usr/share/gdal/jpfgdgml_RdArea.gfs', start: 0, end: 1515 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_3.csv', start: 1515, end: 11849 },
						{ filename: '/usr/share/gdal/plscenesconf.json', start: 11849, end: 47162 },
						{ filename: '/usr/share/gdal/header.dxf', start: 47162, end: 53734 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_10_2.csv', start: 53734, end: 63614 },
						{ filename: '/usr/share/gdal/pci_datum.txt', start: 63614, end: 98719 },
						{ filename: '/usr/share/gdal/nitf_spec.xml', start: 98719, end: 247574 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_6.csv', start: 247574, end: 259216 },
						{ filename: '/usr/share/gdal/pci_ellips.txt', start: 259216, end: 262682 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_5.csv', start: 262682, end: 272178 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_4.csv', start: 272178, end: 281867 },
						{
							filename: '/usr/share/gdal/inspire_cp_CadastralBoundary.gfs',
							start: 281867,
							end: 283517,
						},
						{ filename: '/usr/share/gdal/ozi_ellips.csv', start: 283517, end: 284866 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_1.csv', start: 284866, end: 294552 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_2_0.csv', start: 294552, end: 306753 },
						{ filename: '/usr/share/gdal/ozi_datum.csv', start: 306753, end: 315235 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_10_4.csv', start: 315235, end: 325428 },
						{ filename: '/usr/share/gdal/eedaconf.json', start: 325428, end: 325807 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_10_3.csv', start: 325807, end: 335583 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_local_NCEP.csv',
							start: 335583,
							end: 363560,
						},
						{ filename: '/usr/share/gdal/jpfgdgml_RvrMgtBdry.gfs', start: 363560, end: 364948 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_20_1.csv', start: 364948, end: 374802 },
						{ filename: '/usr/share/gdal/jpfgdgml_BldA.gfs', start: 374802, end: 376303 },
						{ filename: '/usr/share/gdal/vdv452.xsd', start: 376303, end: 379157 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_19.csv', start: 379157, end: 391031 },
						{ filename: '/usr/share/gdal/s57expectedinput.csv', start: 391031, end: 411916 },
						{ filename: '/usr/share/gdal/jpfgdgml_WStrA.gfs', start: 411916, end: 413419 },
						{ filename: '/usr/share/gdal/ruian_vf_v1.gfs', start: 413419, end: 480753 },
						{
							filename: '/usr/share/gdal/inspire_cp_BasicPropertyUnit.gfs',
							start: 480753,
							end: 482493,
						},
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_6.csv', start: 482493, end: 492127 },
						{ filename: '/usr/share/gdal/GDALLogoGS.svg', start: 492127, end: 504432 },
						{ filename: '/usr/share/gdal/s57objectclasses.csv', start: 504432, end: 557759 },
						{ filename: '/usr/share/gdal/GDALLogoColor.svg', start: 557759, end: 570064 },
						{ filename: '/usr/share/gdal/pds4_template.xml', start: 570064, end: 573497 },
						{ filename: '/usr/share/gdal/default.rsc', start: 573497, end: 1037129 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_17.csv', start: 1037129, end: 1037985 },
						{ filename: '/usr/share/gdal/tms_NZTM2000.json', start: 1037985, end: 1043202 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_20_2.csv', start: 1043202, end: 1052708 },
						{ filename: '/usr/share/gdal/jpfgdgml_ElevPt.gfs', start: 1052708, end: 1054208 },
						{ filename: '/usr/share/gdal/cubewerx_extra.wkt', start: 1054208, end: 1066185 },
						{ filename: '/usr/share/gdal/ecw_cs.wkt', start: 1066185, end: 1429902 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_1_2.csv', start: 1429902, end: 1439700 },
						{ filename: '/usr/share/gdal/osmconf.ini', start: 1439700, end: 1444895 },
						{ filename: '/usr/share/gdal/grib2_subcenter.csv', start: 1444895, end: 1447223 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_2.csv', start: 1447223, end: 1458026 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_16.csv', start: 1458026, end: 1467697 },
						{ filename: '/usr/share/gdal/epsg.wkt', start: 1467697, end: 1467724 },
						{ filename: '/usr/share/gdal/jpfgdgml_SBBdry.gfs', start: 1467724, end: 1468977 },
						{ filename: '/usr/share/gdal/jpfgdgml_BldL.gfs', start: 1468977, end: 1470480 },
						{ filename: '/usr/share/gdal/ruian_vf_st_v1.gfs', start: 1470480, end: 1516452 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_190.csv', start: 1516452, end: 1525959 },
						{ filename: '/usr/share/gdal/gmlasconf.xml', start: 1525959, end: 1533391 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_0.csv', start: 1533391, end: 1543754 },
						{ filename: '/usr/share/gdal/gt_datum.csv', start: 1543754, end: 1559558 },
						{ filename: '/usr/share/gdal/ruian_vf_st_uvoh_v1.gfs', start: 1559558, end: 1562158 },
						{ filename: '/usr/share/gdal/LICENSE.TXT', start: 1562158, end: 1581972 },
						{ filename: '/usr/share/gdal/jpfgdgml_SBAPt.gfs', start: 1581972, end: 1583347 },
						{ filename: '/usr/share/gdal/ruian_vf_ob_v1.gfs', start: 1583347, end: 1630122 },
						{ filename: '/usr/share/gdal/jpfgdgml_WL.gfs', start: 1630122, end: 1631621 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_2_3.csv', start: 1631621, end: 1642255 },
						{
							filename: '/usr/share/gdal/tms_LINZAntarticaMapTileGrid.json',
							start: 1642255,
							end: 1646382,
						},
						{ filename: '/usr/share/gdal/GDALLogoBW.svg', start: 1646382, end: 1659404 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_9.csv', start: 1659404, end: 1668940 },
						{ filename: '/usr/share/gdal/gmlasconf.xsd', start: 1668940, end: 1717594 },
						{ filename: '/usr/share/gdal/jpfgdgml_RdCompt.gfs', start: 1717594, end: 1719240 },
						{ filename: '/usr/share/gdal/grib2_process.csv', start: 1719240, end: 1724166 },
						{ filename: '/usr/share/gdal/stateplane.csv', start: 1724166, end: 1734526 },
						{ filename: '/usr/share/gdal/trailer.dxf', start: 1734526, end: 1736801 },
						{ filename: '/usr/share/gdal/nitf_spec.xsd', start: 1736801, end: 1744488 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_6.csv', start: 1744488, end: 1745307 },
						{ filename: '/usr/share/gdal/bag_template.xml', start: 1745307, end: 1754327 },
						{ filename: '/usr/share/gdal/s57attributes.csv', start: 1754327, end: 1774328 },
						{ filename: '/usr/share/gdal/vdv452.xml', start: 1774328, end: 1800144 },
						{ filename: '/usr/share/gdal/jpfgdgml_Cntr.gfs', start: 1800144, end: 1801645 },
						{ filename: '/usr/share/gdal/jpfgdgml_SBArea.gfs', start: 1801645, end: 1803152 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_10_0.csv', start: 1803152, end: 1814925 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_10.csv', start: 1814925, end: 1824626 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_7.csv', start: 1824626, end: 1835117 },
						{ filename: '/usr/share/gdal/jpfgdgml_RailCL.gfs', start: 1835117, end: 1836624 },
						{ filename: '/usr/share/gdal/jpfgdgml_RdEdg.gfs', start: 1836624, end: 1838266 },
						{ filename: '/usr/share/gdal/esri_StatePlane_extra.wkt', start: 1838266, end: 2170812 },
						{ filename: '/usr/share/gdal/jpfgdgml_RdSgmtA.gfs', start: 2170812, end: 2172456 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_10_191.csv',
							start: 2172456,
							end: 2182090,
						},
						{ filename: '/usr/share/gdal/seed_2d.dgn', start: 2182090, end: 2191306 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_local_index.csv',
							start: 2191306,
							end: 2191557,
						},
						{ filename: '/usr/share/gdal/grib2_table_4_2_2_4.csv', start: 2191557, end: 2202785 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_5.csv', start: 2202785, end: 2212611 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_1_1.csv', start: 2212611, end: 2222266 },
						{ filename: '/usr/share/gdal/jpfgdgml_LeveeEdge.gfs', start: 2222266, end: 2223652 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_3.csv', start: 2223652, end: 2224436 },
						{ filename: '/usr/share/gdal/tms_MapML_CBMTILE.json', start: 2224436, end: 2232233 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_20.csv', start: 2232233, end: 2244359 },
						{ filename: '/usr/share/gdal/netcdf_config.xsd', start: 2244359, end: 2251850 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_10_1.csv', start: 2251850, end: 2261448 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_14.csv', start: 2261448, end: 2270999 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_7.csv', start: 2270999, end: 2280555 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_local_NDFD.csv',
							start: 2280555,
							end: 2283214,
						},
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_2.csv', start: 2283214, end: 2292874 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_2.csv', start: 2292874, end: 2296707 },
						{ filename: '/usr/share/gdal/jpfgdgml_RdASL.gfs', start: 2296707, end: 2297958 },
						{ filename: '/usr/share/gdal/jpfgdgml_CommBdry.gfs', start: 2297958, end: 2299342 },
						{ filename: '/usr/share/gdal/vicar.json', start: 2299342, end: 2301749 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_18.csv', start: 2301749, end: 2311973 },
						{ filename: '/usr/share/gdal/s57agencies.csv', start: 2311973, end: 2325277 },
						{ filename: '/usr/share/gdal/jpfgdgml_CommPt.gfs', start: 2325277, end: 2326912 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_15.csv', start: 2326912, end: 2336758 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_1.csv', start: 2336758, end: 2347421 },
						{ filename: '/usr/share/gdal/jpfgdgml_RdMgtBdry.gfs', start: 2347421, end: 2348807 },
						{
							filename: '/usr/share/gdal/inspire_cp_CadastralZoning.gfs',
							start: 2348807,
							end: 2353619,
						},
						{
							filename: '/usr/share/gdal/inspire_cp_CadastralParcel.gfs',
							start: 2353619,
							end: 2356069,
						},
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_0.csv', start: 2356069, end: 2365622 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_local_MRMS.csv',
							start: 2365622,
							end: 2381209,
						},
						{ filename: '/usr/share/gdal/gt_ellips.csv', start: 2381209, end: 2382928 },
						{ filename: '/usr/share/gdal/seed_3d.dgn', start: 2382928, end: 2384976 },
						{ filename: '/usr/share/gdal/tms_MapML_APSTILE.json', start: 2384976, end: 2391249 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_20_0.csv', start: 2391249, end: 2400795 },
						{ filename: '/usr/share/gdal/grib2_table_4_5.csv', start: 2400795, end: 2410808 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_5.csv', start: 2410808, end: 2411728 },
						{ filename: '/usr/share/gdal/template_tiles.mapml', start: 2411728, end: 2413675 },
						{ filename: '/usr/share/gdal/gml_registry.xml', start: 2413675, end: 2420318 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_13.csv', start: 2420318, end: 2429914 },
						{ filename: '/usr/share/gdal/jpfgdgml_WA.gfs', start: 2429914, end: 2431411 },
						{ filename: '/usr/share/gdal/grib2_table_versions.csv', start: 2431411, end: 2431451 },
						{ filename: '/usr/share/gdal/jpfgdgml_Cstline.gfs', start: 2431451, end: 2432960 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_1.csv', start: 2432960, end: 2448697 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_191.csv', start: 2448697, end: 2458317 },
						{ filename: '/usr/share/gdal/jpfgdgml_GCP.gfs', start: 2458317, end: 2460840 },
						{ filename: '/usr/share/gdal/ogrvrt.xsd', start: 2460840, end: 2486589 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_local_HPC.csv',
							start: 2486589,
							end: 2486676,
						},
						{ filename: '/usr/share/gdal/jpfgdgml_AdmPt.gfs', start: 2486676, end: 2488309 },
						{ filename: '/usr/share/gdal/jpfgdgml_AdmArea.gfs', start: 2488309, end: 2489949 },
						{ filename: '/usr/share/gdal/jpfgdgml_WStrL.gfs', start: 2489949, end: 2491454 },
						{ filename: '/usr/share/gdal/grib2_center.csv', start: 2491454, end: 2495625 },
						{ filename: '/usr/share/gdal/gdalvrt.xsd', start: 2495625, end: 2523196 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_0.csv', start: 2523196, end: 2534147 },
						{ filename: '/usr/share/gdal/gdalicon.png', start: 2534147, end: 2536168 },
						{
							filename: '/usr/share/gdal/gdalmdiminfo_output.schema.json',
							start: 2536168,
							end: 2541629,
						},
						{ filename: '/usr/share/gdal/grib2_table_4_2_2_5.csv', start: 2541629, end: 2551142 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_8.csv', start: 2551142, end: 2560828 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_0_4.csv', start: 2560828, end: 2571139 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_4_3.csv', start: 2571139, end: 2580861 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_1_0.csv', start: 2580861, end: 2591003 },
						{ filename: '/usr/share/gdal/grib2_table_4_2_3_4.csv', start: 2591003, end: 2592054 },
						{ filename: '/usr/share/gdal/jpfgdgml_AdmBdry.gfs', start: 2592054, end: 2593436 },
						{
							filename: '/usr/share/gdal/grib2_table_4_2_local_Canada.csv',
							start: 2593436,
							end: 2593769,
						},
						{ filename: '/usr/share/gdal/pdfcomposition.xsd', start: 2593769, end: 2628103 },
						{ filename: '/usr/share/proj/proj.ini', start: 2628103, end: 2629153 },
						{ filename: '/usr/share/proj/ITRF2000', start: 2629153, end: 2631252 },
						{ filename: '/usr/share/proj/projjson.schema.json', start: 2631252, end: 2668530 },
						{ filename: '/usr/share/proj/nad83', start: 2668530, end: 2685123 },
						{ filename: '/usr/share/proj/ITRF2014', start: 2685123, end: 2688612 },
						{ filename: '/usr/share/proj/other.extra', start: 2688612, end: 2692527 },
						{
							filename: '/usr/share/proj/deformation_model.schema.json',
							start: 2692527,
							end: 2710198,
						},
						{ filename: '/usr/share/proj/nad27', start: 2710198, end: 2729733 },
						{ filename: '/usr/share/proj/triangulation.schema.json', start: 2729733, end: 2738136 },
						{ filename: '/usr/share/proj/nad.lst', start: 2738136, end: 2744521 },
						{ filename: '/usr/share/proj/GL27', start: 2744521, end: 2745249 },
						{ filename: '/usr/share/proj/world', start: 2745249, end: 2752328 },
						{ filename: '/usr/share/proj/CH', start: 2752328, end: 2753425 },
						{ filename: '/usr/share/proj/ITRF2008', start: 2753425, end: 2759105 },
						{ filename: '/usr/share/proj/proj.db', start: 2759105, end: 11037121 },
					],
					remote_package_size: 11037121,
				}),
				'object' === ('undefined' == typeof window ? 'undefined' : Mr(window))
					? window.encodeURIComponent(
							window.location.pathname
								.toString()
								.substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/',
					  )
					: 'undefined' == typeof process &&
					  'undefined' != typeof location &&
					  encodeURIComponent(
							location.pathname
								.toString()
								.substring(0, location.pathname.toString().lastIndexOf('/')) + '/',
					  ),
				(t = 'gdal3WebAssembly.data'),
				'function' != typeof c.locateFilePackage ||
					c.locateFile ||
					((c.locateFile = c.locateFilePackage),
					f(
						'warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)',
					)),
				(t = c.locateFile ? c.locateFile(t, '') : t),
				(e = x.remote_package_size),
				(W = null),
				(Y = c.getPreloadedPackage ? c.getPreloadedPackage(t, e) : null) ||
					((B = t),
					(U = e),
					(K = function (t) {
						W ? (W(t), (W = null)) : (Y = t);
					}),
					(z = function (t) {
						console.error('package error:', t);
					}),
					'object' === ('undefined' == typeof process ? 'undefined' : Mr(process)) &&
					'object' === Mr(process.versions) &&
					'string' == typeof process.versions.node
						? xr.readFile(B, function (t, e) {
								t ? z(t) : K(e.buffer);
						  })
						: ((u = new XMLHttpRequest()).open('GET', B, !0),
						  (u.responseType = 'arraybuffer'),
						  (u.onprogress = function (t) {
								var e = B,
									r = U;
								if ((t.total && (r = t.total), t.loaded)) {
									u.addedTotal
										? (c.dataFileDownloads[e].loaded = t.loaded)
										: ((u.addedTotal = !0),
										  c.dataFileDownloads || (c.dataFileDownloads = {}),
										  (c.dataFileDownloads[e] = { loaded: t.loaded, total: r }));
									var n,
										a = 0,
										i = 0,
										o = 0;
									for (n in c.dataFileDownloads) {
										var s = c.dataFileDownloads[n];
										(a += s.total), (i += s.loaded), o++;
									}
									(a = Math.ceil((a * c.expectedDataFileDownloads) / o)),
										c.setStatus && c.setStatus('Downloading data... (' + i + '/' + a + ')');
								} else c.dataFileDownloads || (c.setStatus && c.setStatus('Downloading data...'));
						  }),
						  (u.onerror = function (t) {
								throw new Error('NetworkError for: ' + B);
						  }),
						  (u.onload = function (t) {
								if (
									!(
										200 == u.status ||
										304 == u.status ||
										206 == u.status ||
										(0 == u.status && u.response)
									)
								)
									throw new Error(u.statusText + ' : ' + u.responseURL);
								var e = u.response;
								K(e);
						  }),
						  u.send(null))),
				c.calledRun ? V() : (c.preRun || (c.preRun = []), c.preRun.push(V)));
		var H,
			X,
			q,
			i,
			a,
			Q,
			t = Object.assign({}, c),
			Z = './this.program',
			J = function (t, e) {
				throw e;
			},
			$ = 'object' == ('undefined' == typeof window ? 'undefined' : Mr(window)),
			l = 'function' == typeof importScripts,
			o =
				'object' == ('undefined' == typeof process ? 'undefined' : Mr(process)) &&
				'object' == Mr(process.versions) &&
				'string' == typeof process.versions.node,
			e = '';
		function s(t) {
			nt = t;
		}
		o
			? ((e = l ? Br.dirname(e) + '/' : __dirname + '/'),
			  (Q = function () {
					a || ((i = xr), (a = Br));
			  }),
			  (H = function (t, e) {
					return Q(), (t = a.normalize(t)), i.readFileSync(t, e ? void 0 : 'utf8');
			  }),
			  (q = function (t) {
					t = H(t, !0);
					return (t = t.buffer ? t : new Uint8Array(t));
			  }),
			  (X = function (t, r, n) {
					Q(),
						(t = a.normalize(t)),
						i.readFile(t, function (t, e) {
							t ? n(t) : r(e.buffer);
						});
			  }),
			  1 < process.argv.length && (Z = process.argv[1].replace(/\\/g, '/')),
			  process.argv.slice(2),
			  process.on('uncaughtException', function (t) {
					if (!(t instanceof Ot)) throw t;
			  }),
			  process.on('unhandledRejection', function (t) {
					throw t;
			  }),
			  (J = function (t, e) {
					if (at) throw ((process.exitCode = t), e);
					(e = e) instanceof Ot || f('exiting due to exception: ' + e), process.exit(t);
			  }),
			  (c.inspect = function () {
					return '[Emscripten Module object]';
			  }))
			: ($ || l) &&
			  (l
					? (e = self.location.href)
					: 'undefined' != typeof document &&
					  document.currentScript &&
					  (e = document.currentScript.src),
			  (e =
					0 !== (e = Ir ? Ir : e).indexOf('blob:')
						? e.substr(0, e.replace(/[?#].*/, '').lastIndexOf('/') + 1)
						: ''),
			  (H = function (t) {
					var e = new XMLHttpRequest();
					return e.open('GET', t, !1), e.send(null), e.responseText;
			  }),
			  l &&
					(q = function (t) {
						var e = new XMLHttpRequest();
						return (
							e.open('GET', t, !1),
							(e.responseType = 'arraybuffer'),
							e.send(null),
							new Uint8Array(e.response)
						);
					}),
			  (X = function (t, e, r) {
					var n = new XMLHttpRequest();
					n.open('GET', t, !0),
						(n.responseType = 'arraybuffer'),
						(n.onload = function () {
							200 == n.status || (0 == n.status && n.response) ? e(n.response) : r();
						}),
						(n.onerror = r),
						n.send(null);
			  }));
		var tt,
			et,
			rt = c.print || console.log.bind(console),
			f = c.printErr || console.warn.bind(console),
			nt =
				(Object.assign(c, t),
				c.arguments,
				c.thisProgram && (Z = c.thisProgram),
				c.quit && (J = c.quit),
				0),
			at = (c.wasmBinary && (tt = c.wasmBinary), c.noExitRuntime || !0),
			it =
				('object' != ('undefined' == typeof WebAssembly ? 'undefined' : Mr(WebAssembly)) &&
					v('no native wasm support detected'),
				!1);
		function ot(t, e) {
			t || v(e);
		}
		var st,
			d,
			p,
			ut,
			_,
			m,
			ct,
			lt,
			h,
			ft = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
		function dt(t, e, r) {
			for (var n = e + r, a = e; t[a] && !(n <= a); ) ++a;
			if (16 < a - e && t.buffer && ft) return ft.decode(t.subarray(e, a));
			for (var i = ''; e < a; ) {
				var o,
					s,
					u = t[e++];
				128 & u
					? ((s = 63 & t[e++]),
					  192 == (224 & u)
							? (i += String.fromCharCode(((31 & u) << 6) | s))
							: ((o = 63 & t[e++]),
							  (u =
									224 == (240 & u)
										? ((15 & u) << 12) | (s << 6) | o
										: ((7 & u) << 18) | (s << 12) | (o << 6) | (63 & t[e++])) < 65536
									? (i += String.fromCharCode(u))
									: ((s = u - 65536),
									  (i += String.fromCharCode(55296 | (s >> 10), 56320 | (1023 & s))))))
					: (i += String.fromCharCode(u));
			}
			return i;
		}
		function g(t, e) {
			return t ? dt(p, t, e) : '';
		}
		function pt(t, e, r, n) {
			if (!(0 < n)) return 0;
			for (var a = r, i = r + n - 1, o = 0; o < t.length; ++o) {
				var s = t.charCodeAt(o);
				if (
					(s =
						55296 <= s && s <= 57343
							? (65536 + ((1023 & s) << 10)) | (1023 & t.charCodeAt(++o))
							: s) <= 127
				) {
					if (i <= r) break;
					e[r++] = s;
				} else if (s <= 2047) {
					if (i <= r + 1) break;
					(e[r++] = 192 | (s >> 6)), (e[r++] = 128 | (63 & s));
				} else if (s <= 65535) {
					if (i <= r + 2) break;
					(e[r++] = 224 | (s >> 12)), (e[r++] = 128 | ((s >> 6) & 63)), (e[r++] = 128 | (63 & s));
				} else {
					if (i <= r + 3) break;
					(e[r++] = 240 | (s >> 18)),
						(e[r++] = 128 | ((s >> 12) & 63)),
						(e[r++] = 128 | ((s >> 6) & 63)),
						(e[r++] = 128 | (63 & s));
				}
			}
			return (e[r] = 0), r - a;
		}
		function mt(t, e, r) {
			return pt(t, p, e, r);
		}
		function ht(t) {
			for (var e = 0, r = 0; r < t.length; ++r) {
				var n = t.charCodeAt(r);
				n <= 127
					? e++
					: n <= 2047
					? (e += 2)
					: 55296 <= n && n <= 57343
					? ((e += 4), ++r)
					: (e += 3);
			}
			return e;
		}
		function yt(t) {
			(st = t),
				(c.HEAP8 = d = new Int8Array(t)),
				(c.HEAP16 = ut = new Int16Array(t)),
				(c.HEAP32 = _ = new Int32Array(t)),
				(c.HEAPU8 = p = new Uint8Array(t)),
				(c.HEAPU16 = new Uint16Array(t)),
				(c.HEAPU32 = m = new Uint32Array(t)),
				(c.HEAPF32 = ct = new Float32Array(t)),
				(c.HEAPF64 = lt = new Float64Array(t));
		}
		c.INITIAL_MEMORY;
		var _t = [],
			gt = [],
			Et = [];
		function wt() {
			if (c.preRun)
				for ('function' == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length; )
					(t = c.preRun.shift()), _t.unshift(t);
			var t;
			St(_t);
		}
		function vt() {
			if (c.postRun)
				for ('function' == typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length; )
					(t = c.postRun.shift()), Et.unshift(t);
			var t;
			St(Et);
		}
		var y,
			E,
			w,
			r = 0,
			bt = null;
		function Dt(t) {
			r++, c.monitorRunDependencies && c.monitorRunDependencies(r);
		}
		function At(t) {
			var e;
			r--,
				c.monitorRunDependencies && c.monitorRunDependencies(r),
				0 == r && bt && ((e = bt), (bt = null), e());
		}
		function v(t) {
			c.onAbort && c.onAbort(t),
				f((t = 'Aborted(' + t + ')')),
				(it = !0),
				(t += '. Build with -sASSERTIONS for more info.');
			t = new WebAssembly.RuntimeError(t);
			throw (I(t), t);
		}
		function Tt(t) {
			return t.startsWith('data:application/octet-stream;base64,');
		}
		function Ct(t) {
			return t.startsWith('file://');
		}
		function Lt(t) {
			try {
				if (t == y && tt) return new Uint8Array(tt);
				if (q) return q(t);
				throw 'both async and sync fetching of the wasm failed';
			} catch (t) {
				v(t);
			}
		}
		function Ot(t) {
			(this.name = 'ExitStatus'),
				(this.message = 'Program terminated with exit(' + t + ')'),
				(this.status = t);
		}
		function St(t) {
			for (; 0 < t.length; ) t.shift()(c);
		}
		function Gt(t, e) {
			d.set(t, e);
		}
		Tt((y = 'gdal3WebAssembly.wasm')) ||
			((Yt = y), (y = c.locateFile ? c.locateFile(Yt, e) : e + Yt));
		var Nt = [];
		function C(t) {
			var e = Nt[t];
			return e || (t >= Nt.length && (Nt.length = t + 1), (Nt[t] = e = h.get(t))), e;
		}
		var Ft = [],
			jt = 0,
			b = 0;
		function Pt(t) {
			(this.excPtr = t),
				(this.ptr = t - 24),
				(this.set_type = function (t) {
					m[(this.ptr + 4) >> 2] = t;
				}),
				(this.get_type = function () {
					return m[(this.ptr + 4) >> 2];
				}),
				(this.set_destructor = function (t) {
					m[(this.ptr + 8) >> 2] = t;
				}),
				(this.get_destructor = function () {
					return m[(this.ptr + 8) >> 2];
				}),
				(this.set_refcount = function (t) {
					_[this.ptr >> 2] = t;
				}),
				(this.set_caught = function (t) {
					d[(this.ptr + 12) >> 0] = t = t ? 1 : 0;
				}),
				(this.get_caught = function () {
					return 0 != d[(this.ptr + 12) >> 0];
				}),
				(this.set_rethrown = function (t) {
					d[(this.ptr + 13) >> 0] = t = t ? 1 : 0;
				}),
				(this.get_rethrown = function () {
					return 0 != d[(this.ptr + 13) >> 0];
				}),
				(this.init = function (t, e) {
					this.set_adjusted_ptr(0),
						this.set_type(t),
						this.set_destructor(e),
						this.set_refcount(0),
						this.set_caught(!1),
						this.set_rethrown(!1);
				}),
				(this.add_ref = function () {
					var t = _[this.ptr >> 2];
					_[this.ptr >> 2] = t + 1;
				}),
				(this.release_ref = function () {
					var t = _[this.ptr >> 2];
					return (_[this.ptr >> 2] = t - 1), 1 === t;
				}),
				(this.set_adjusted_ptr = function (t) {
					m[(this.ptr + 16) >> 2] = t;
				}),
				(this.get_adjusted_ptr = function () {
					return m[(this.ptr + 16) >> 2];
				}),
				(this.get_exception_ptr = function () {
					if (he(this.get_type())) return m[this.excPtr >> 2];
					var t = this.get_adjusted_ptr();
					return 0 !== t ? t : this.excPtr;
				});
		}
		function Rt(t) {
			return fe(new Pt(t).ptr);
		}
		var D = {
			isAbs: function (t) {
				return '/' === t.charAt(0);
			},
			splitPath: function (t) {
				return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(t).slice(1);
			},
			normalizeArray: function (t, e) {
				for (var r = 0, n = t.length - 1; 0 <= n; n--) {
					var a = t[n];
					'.' === a
						? t.splice(n, 1)
						: '..' === a
						? (t.splice(n, 1), r++)
						: r && (t.splice(n, 1), r--);
				}
				if (e) for (; r; r--) t.unshift('..');
				return t;
			},
			normalize: function (t) {
				var e = D.isAbs(t),
					r = '/' === t.substr(-1);
				return (
					(t =
						(t = D.normalizeArray(
							t.split('/').filter(function (t) {
								return !!t;
							}),
							!e,
						).join('/')) || e
							? t
							: '.') &&
						r &&
						(t += '/'),
					(e ? '/' : '') + t
				);
			},
			dirname: function (t) {
				var t = D.splitPath(t),
					e = t[0],
					t = t[1];
				return e || t ? e + (t = t && t.substr(0, t.length - 1)) : '.';
			},
			basename: function (t) {
				if ('/' === t) return '/';
				var e = (t = (t = D.normalize(t)).replace(/\/$/, '')).lastIndexOf('/');
				return -1 === e ? t : t.substr(e + 1);
			},
			join: function () {
				var t = Array.prototype.slice.call(arguments, 0);
				return D.normalize(t.join('/'));
			},
			join2: function (t, e) {
				return D.normalize(t + '/' + e);
			},
		};
		function kt() {
			var t;
			if (
				'object' == ('undefined' == typeof crypto ? 'undefined' : Mr(crypto)) &&
				'function' == typeof crypto.getRandomValues
			)
				return (
					(t = new Uint8Array(1)),
					function () {
						return crypto.getRandomValues(t), t[0];
					}
				);
			if (o)
				try {
					var e = void 0;
					return function () {
						return e.randomBytes(1)[0];
					};
				} catch (t) {}
			return function () {
				v('randomDevice');
			};
		}
		var A = {
			resolve: function () {
				for (var t = '', e = !1, r = arguments.length - 1; -1 <= r && !e; r--) {
					var n = 0 <= r ? arguments[r] : S.cwd();
					if ('string' != typeof n)
						throw new TypeError('Arguments to path.resolve must be strings');
					if (!n) return '';
					(t = n + '/' + t), (e = D.isAbs(n));
				}
				return (
					(e ? '/' : '') +
						(t = D.normalizeArray(
							t.split('/').filter(function (t) {
								return !!t;
							}),
							!e,
						).join('/')) || '.'
				);
			},
			relative: function (t, e) {
				function r(t) {
					for (var e = 0; e < t.length && '' === t[e]; e++);
					for (var r = t.length - 1; 0 <= r && '' === t[r]; r--);
					return r < e ? [] : t.slice(e, r - e + 1);
				}
				(t = A.resolve(t).substr(1)), (e = A.resolve(e).substr(1));
				for (
					var n = r(t.split('/')),
						a = r(e.split('/')),
						i = Math.min(n.length, a.length),
						o = i,
						s = 0;
					s < i;
					s++
				)
					if (n[s] !== a[s]) {
						o = s;
						break;
					}
				for (var u = [], s = o; s < n.length; s++) u.push('..');
				return (u = u.concat(a.slice(o))).join('/');
			},
		};
		function Mt(t, e, r) {
			(r = 0 < r ? r : ht(t) + 1), (r = new Array(r)), (t = pt(t, r, 0, r.length));
			return e && (r.length = t), r;
		}
		var n = {
			ttys: [],
			init: function () {},
			shutdown: function () {},
			register: function (t, e) {
				(n.ttys[t] = { input: [], output: [], ops: e }), S.registerDevice(t, n.stream_ops);
			},
			stream_ops: {
				open: function (t) {
					var e = n.ttys[t.node.rdev];
					if (!e) throw new S.ErrnoError(43);
					(t.tty = e), (t.seekable = !1);
				},
				close: function (t) {
					t.tty.ops.flush(t.tty);
				},
				flush: function (t) {
					t.tty.ops.flush(t.tty);
				},
				read: function (t, e, r, n, a) {
					if (!t.tty || !t.tty.ops.get_char) throw new S.ErrnoError(60);
					for (var i, o = 0, s = 0; s < n; s++) {
						try {
							i = t.tty.ops.get_char(t.tty);
						} catch (t) {
							throw new S.ErrnoError(29);
						}
						if (void 0 === i && 0 === o) throw new S.ErrnoError(6);
						if (null == i) break;
						o++, (e[r + s] = i);
					}
					return o && (t.node.timestamp = Date.now()), o;
				},
				write: function (t, e, r, n, a) {
					if (!t.tty || !t.tty.ops.put_char) throw new S.ErrnoError(60);
					try {
						for (var i = 0; i < n; i++) t.tty.ops.put_char(t.tty, e[r + i]);
					} catch (t) {
						throw new S.ErrnoError(29);
					}
					return n && (t.node.timestamp = Date.now()), i;
				},
			},
			default_tty_ops: {
				get_char: function (t) {
					if (!t.input.length) {
						var e = null;
						if (o) {
							var r = Buffer.alloc(256),
								n = 0;
							try {
								n = i.readSync(process.stdin.fd, r, 0, 256, -1);
							} catch (t) {
								if (!t.toString().includes('EOF')) throw t;
								n = 0;
							}
							e = 0 < n ? r.slice(0, n).toString('utf-8') : null;
						} else
							'undefined' != typeof window && 'function' == typeof window.prompt
								? null !== (e = window.prompt('Input: ')) && (e += '\n')
								: 'function' == typeof readline && null !== (e = readline()) && (e += '\n');
						if (!e) return null;
						t.input = Mt(e, !0);
					}
					return t.input.shift();
				},
				put_char: function (t, e) {
					null === e || 10 === e
						? (rt(dt(t.output, 0)), (t.output = []))
						: 0 != e && t.output.push(e);
				},
				flush: function (t) {
					t.output && 0 < t.output.length && (rt(dt(t.output, 0)), (t.output = []));
				},
			},
			default_tty1_ops: {
				put_char: function (t, e) {
					null === e || 10 === e
						? (f(dt(t.output, 0)), (t.output = []))
						: 0 != e && t.output.push(e);
				},
				flush: function (t) {
					t.output && 0 < t.output.length && (f(dt(t.output, 0)), (t.output = []));
				},
			},
		};
		function It(t) {
			(r = t), (e = 65536), (t = Math.ceil(r / e) * e);
			var e,
				r = de(65536, t);
			return r ? ((e = t), p.fill(0, r, r + e), r) : 0;
		}
		var T = {
				ops_table: null,
				mount: function (t) {
					return T.createNode(null, '/', 16895, 0);
				},
				createNode: function (t, e, r, n) {
					if (S.isBlkdev(r) || S.isFIFO(r)) throw new S.ErrnoError(63);
					T.ops_table ||
						(T.ops_table = {
							dir: {
								node: {
									getattr: T.node_ops.getattr,
									setattr: T.node_ops.setattr,
									lookup: T.node_ops.lookup,
									mknod: T.node_ops.mknod,
									rename: T.node_ops.rename,
									unlink: T.node_ops.unlink,
									rmdir: T.node_ops.rmdir,
									readdir: T.node_ops.readdir,
									symlink: T.node_ops.symlink,
								},
								stream: { llseek: T.stream_ops.llseek },
							},
							file: {
								node: { getattr: T.node_ops.getattr, setattr: T.node_ops.setattr },
								stream: {
									llseek: T.stream_ops.llseek,
									read: T.stream_ops.read,
									write: T.stream_ops.write,
									allocate: T.stream_ops.allocate,
									mmap: T.stream_ops.mmap,
									msync: T.stream_ops.msync,
								},
							},
							link: {
								node: {
									getattr: T.node_ops.getattr,
									setattr: T.node_ops.setattr,
									readlink: T.node_ops.readlink,
								},
								stream: {},
							},
							chrdev: {
								node: { getattr: T.node_ops.getattr, setattr: T.node_ops.setattr },
								stream: S.chrdev_stream_ops,
							},
						});
					r = S.createNode(t, e, r, n);
					return (
						S.isDir(r.mode)
							? ((r.node_ops = T.ops_table.dir.node),
							  (r.stream_ops = T.ops_table.dir.stream),
							  (r.contents = {}))
							: S.isFile(r.mode)
							? ((r.node_ops = T.ops_table.file.node),
							  (r.stream_ops = T.ops_table.file.stream),
							  (r.usedBytes = 0),
							  (r.contents = null))
							: S.isLink(r.mode)
							? ((r.node_ops = T.ops_table.link.node), (r.stream_ops = T.ops_table.link.stream))
							: S.isChrdev(r.mode) &&
							  ((r.node_ops = T.ops_table.chrdev.node),
							  (r.stream_ops = T.ops_table.chrdev.stream)),
						(r.timestamp = Date.now()),
						t && ((t.contents[e] = r), (t.timestamp = r.timestamp)),
						r
					);
				},
				getFileDataAsTypedArray: function (t) {
					return t.contents
						? t.contents.subarray
							? t.contents.subarray(0, t.usedBytes)
							: new Uint8Array(t.contents)
						: new Uint8Array(0);
				},
				expandFileStorage: function (t, e) {
					var r = t.contents ? t.contents.length : 0;
					e <= r ||
						((e = Math.max(e, (r * (r < 1048576 ? 2 : 1.125)) >>> 0)),
						0 != r && (e = Math.max(e, 256)),
						(r = t.contents),
						(t.contents = new Uint8Array(e)),
						0 < t.usedBytes && t.contents.set(r.subarray(0, t.usedBytes), 0));
				},
				resizeFileStorage: function (t, e) {
					var r;
					t.usedBytes != e &&
						(0 == e
							? ((t.contents = null), (t.usedBytes = 0))
							: ((r = t.contents),
							  (t.contents = new Uint8Array(e)),
							  r && t.contents.set(r.subarray(0, Math.min(e, t.usedBytes))),
							  (t.usedBytes = e)));
				},
				node_ops: {
					getattr: function (t) {
						var e = {};
						return (
							(e.dev = S.isChrdev(t.mode) ? t.id : 1),
							(e.ino = t.id),
							(e.mode = t.mode),
							(e.nlink = 1),
							(e.uid = 0),
							(e.gid = 0),
							(e.rdev = t.rdev),
							S.isDir(t.mode)
								? (e.size = 4096)
								: S.isFile(t.mode)
								? (e.size = t.usedBytes)
								: S.isLink(t.mode)
								? (e.size = t.link.length)
								: (e.size = 0),
							(e.atime = new Date(t.timestamp)),
							(e.mtime = new Date(t.timestamp)),
							(e.ctime = new Date(t.timestamp)),
							(e.blksize = 4096),
							(e.blocks = Math.ceil(e.size / e.blksize)),
							e
						);
					},
					setattr: function (t, e) {
						void 0 !== e.mode && (t.mode = e.mode),
							void 0 !== e.timestamp && (t.timestamp = e.timestamp),
							void 0 !== e.size && T.resizeFileStorage(t, e.size);
					},
					lookup: function (t, e) {
						throw S.genericErrors[44];
					},
					mknod: function (t, e, r, n) {
						return T.createNode(t, e, r, n);
					},
					rename: function (t, e, r) {
						if (S.isDir(t.mode)) {
							var n;
							try {
								n = S.lookupNode(e, r);
							} catch (t) {}
							if (n) for (var a in n.contents) throw new S.ErrnoError(55);
						}
						delete t.parent.contents[t.name],
							(t.parent.timestamp = Date.now()),
							(t.name = r),
							(e.contents[r] = t),
							(e.timestamp = t.parent.timestamp),
							(t.parent = e);
					},
					unlink: function (t, e) {
						delete t.contents[e], (t.timestamp = Date.now());
					},
					rmdir: function (t, e) {
						for (var r in S.lookupNode(t, e).contents) throw new S.ErrnoError(55);
						delete t.contents[e], (t.timestamp = Date.now());
					},
					readdir: function (t) {
						var e,
							r = ['.', '..'];
						for (e in t.contents) t.contents.hasOwnProperty(e) && r.push(e);
						return r;
					},
					symlink: function (t, e, r) {
						t = T.createNode(t, e, 41471, 0);
						return (t.link = r), t;
					},
					readlink: function (t) {
						if (S.isLink(t.mode)) return t.link;
						throw new S.ErrnoError(28);
					},
				},
				stream_ops: {
					read: function (t, e, r, n, a) {
						var i = t.node.contents;
						if (a >= t.node.usedBytes) return 0;
						var o = Math.min(t.node.usedBytes - a, n);
						if (8 < o && i.subarray) e.set(i.subarray(a, a + o), r);
						else for (var s = 0; s < o; s++) e[r + s] = i[a + s];
						return o;
					},
					write: function (t, e, r, n, a, i) {
						if ((e.buffer === d.buffer && (i = !1), !n)) return 0;
						var o = t.node;
						if (((o.timestamp = Date.now()), e.subarray && (!o.contents || o.contents.subarray))) {
							if (i) return (o.contents = e.subarray(r, r + n)), (o.usedBytes = n);
							if (0 === o.usedBytes && 0 === a)
								return (o.contents = e.slice(r, r + n)), (o.usedBytes = n);
							if (a + n <= o.usedBytes) return o.contents.set(e.subarray(r, r + n), a), n;
						}
						if ((T.expandFileStorage(o, a + n), o.contents.subarray && e.subarray))
							o.contents.set(e.subarray(r, r + n), a);
						else for (var s = 0; s < n; s++) o.contents[a + s] = e[r + s];
						return (o.usedBytes = Math.max(o.usedBytes, a + n)), n;
					},
					llseek: function (t, e, r) {
						if (
							(1 === r
								? (e += t.position)
								: 2 === r && S.isFile(t.node.mode) && (e += t.node.usedBytes),
							e < 0)
						)
							throw new S.ErrnoError(28);
						return e;
					},
					allocate: function (t, e, r) {
						T.expandFileStorage(t.node, e + r),
							(t.node.usedBytes = Math.max(t.node.usedBytes, e + r));
					},
					mmap: function (t, e, r, n, a) {
						if (!S.isFile(t.node.mode)) throw new S.ErrnoError(43);
						var i,
							o,
							t = t.node.contents;
						if (2 & a || t.buffer !== st) {
							if (
								((0 < r || r + e < t.length) &&
									(t = t.subarray ? t.subarray(r, r + e) : Array.prototype.slice.call(t, r, r + e)),
								(o = !0),
								!(i = It(e)))
							)
								throw new S.ErrnoError(48);
							d.set(t, i);
						} else (o = !1), (i = t.byteOffset);
						return { ptr: i, allocated: o };
					},
					msync: function (t, e, r, n, a) {
						if (S.isFile(t.node.mode)) return 2 & a || T.stream_ops.write(t, e, 0, n, r, !1), 0;
						throw new S.ErrnoError(43);
					},
				},
			},
			xt = {},
			L = {
				isWindows: !1,
				staticInit: function () {
					L.isWindows = !!process.platform.match(/^win/);
					var t = process.binding('constants');
					t.fs && (t = t.fs),
						(L.flagsForNodeMap = {
							1024: t.O_APPEND,
							64: t.O_CREAT,
							128: t.O_EXCL,
							256: t.O_NOCTTY,
							0: t.O_RDONLY,
							2: t.O_RDWR,
							4096: t.O_SYNC,
							512: t.O_TRUNC,
							1: t.O_WRONLY,
							131072: t.O_NOFOLLOW,
						});
				},
				convertNodeCode: function (t) {
					t = t.code;
					return xt[t];
				},
				mount: function (t) {
					return L.createNode(null, '/', L.getMode(t.opts.root), 0);
				},
				createNode: function (t, e, r, n) {
					if (!S.isDir(r) && !S.isFile(r) && !S.isLink(r)) throw new S.ErrnoError(28);
					t = S.createNode(t, e, r);
					return (t.node_ops = L.node_ops), (t.stream_ops = L.stream_ops), t;
				},
				getMode: function (t) {
					var e;
					try {
						(e = i.lstatSync(t)), L.isWindows && (e.mode = e.mode | ((292 & e.mode) >> 2));
					} catch (t) {
						if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
						throw t;
					}
					return e.mode;
				},
				realPath: function (t) {
					for (var e = []; t.parent !== t; ) e.push(t.name), (t = t.parent);
					return e.push(t.mount.opts.root), e.reverse(), D.join.apply(null, e);
				},
				flagsForNode: function (t) {
					t = -2097153 & t & -2049 & -32769 & -524289 & -65537;
					var e,
						r = 0;
					for (e in L.flagsForNodeMap) t & e && ((r |= L.flagsForNodeMap[e]), (t ^= e));
					if (t) throw new S.ErrnoError(28);
					return r;
				},
				node_ops: {
					getattr: function (t) {
						var e,
							t = L.realPath(t);
						try {
							e = i.lstatSync(t);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
						return (
							L.isWindows && !e.blksize && (e.blksize = 4096),
							L.isWindows && !e.blocks && (e.blocks = ((e.size + e.blksize - 1) / e.blksize) | 0),
							{
								dev: e.dev,
								ino: e.ino,
								mode: e.mode,
								nlink: e.nlink,
								uid: e.uid,
								gid: e.gid,
								rdev: e.rdev,
								size: e.size,
								atime: e.atime,
								mtime: e.mtime,
								ctime: e.ctime,
								blksize: e.blksize,
								blocks: e.blocks,
							}
						);
					},
					setattr: function (t, e) {
						var r,
							n = L.realPath(t);
						try {
							void 0 !== e.mode && (i.chmodSync(n, e.mode), (t.mode = e.mode)),
								void 0 !== e.timestamp && ((r = new Date(e.timestamp)), i.utimesSync(n, r, r)),
								void 0 !== e.size && i.truncateSync(n, e.size);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					lookup: function (t, e) {
						var r = D.join2(L.realPath(t), e),
							r = L.getMode(r);
						return L.createNode(t, e, r);
					},
					mknod: function (t, e, r, n) {
						(t = L.createNode(t, e, r, n)), (e = L.realPath(t));
						try {
							S.isDir(t.mode) ? i.mkdirSync(e, t.mode) : i.writeFileSync(e, '', { mode: t.mode });
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
						return t;
					},
					rename: function (t, e, r) {
						var n = L.realPath(t),
							e = D.join2(L.realPath(e), r);
						try {
							i.renameSync(n, e);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
						t.name = r;
					},
					unlink: function (t, e) {
						t = D.join2(L.realPath(t), e);
						try {
							i.unlinkSync(t);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					rmdir: function (t, e) {
						t = D.join2(L.realPath(t), e);
						try {
							i.rmdirSync(t);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					readdir: function (t) {
						t = L.realPath(t);
						try {
							return i.readdirSync(t);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					symlink: function (t, e, r) {
						t = D.join2(L.realPath(t), e);
						try {
							i.symlinkSync(r, t);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					readlink: function (t) {
						var e = L.realPath(t);
						try {
							return (e = i.readlinkSync(e)), a.relative(a.resolve(t.mount.opts.root), e);
						} catch (t) {
							if (!t.code) throw t;
							if ('UNKNOWN' === t.code) throw new S.ErrnoError(28);
							throw new S.ErrnoError(L.convertNodeCode(t));
						}
					},
				},
				stream_ops: {
					open: function (t) {
						var e = L.realPath(t.node);
						try {
							S.isFile(t.node.mode) && (t.nfd = i.openSync(e, L.flagsForNode(t.flags)));
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					close: function (t) {
						try {
							S.isFile(t.node.mode) && t.nfd && i.closeSync(t.nfd);
						} catch (t) {
							if (t.code) throw new S.ErrnoError(L.convertNodeCode(t));
							throw t;
						}
					},
					read: function (t, e, r, n, a) {
						if (0 === n) return 0;
						try {
							return i.readSync(t.nfd, Buffer.from(e.buffer), r, n, a);
						} catch (t) {
							throw new S.ErrnoError(L.convertNodeCode(t));
						}
					},
					write: function (t, e, r, n, a) {
						try {
							return i.writeSync(t.nfd, Buffer.from(e.buffer), r, n, a);
						} catch (t) {
							throw new S.ErrnoError(L.convertNodeCode(t));
						}
					},
					llseek: function (t, e, r) {
						if (1 === r) e += t.position;
						else if (2 === r && S.isFile(t.node.mode))
							try {
								e += i.fstatSync(t.nfd).size;
							} catch (t) {
								throw new S.ErrnoError(L.convertNodeCode(t));
							}
						if (e < 0) throw new S.ErrnoError(28);
						return e;
					},
					mmap: function (t, e, r, n, a) {
						if (!S.isFile(t.node.mode)) throw new S.ErrnoError(43);
						var i = It(e);
						return L.stream_ops.read(t, d, i, e, r), { ptr: i, allocated: !0 };
					},
					msync: function (t, e, r, n, a) {
						if (S.isFile(t.node.mode)) return 2 & a || L.stream_ops.write(t, e, 0, n, r, !1), 0;
						throw new S.ErrnoError(43);
					},
				},
			},
			O = {
				DIR_MODE: 16895,
				FILE_MODE: 33279,
				reader: null,
				mount: function (t) {
					ot(l), O.reader || (O.reader = new FileReaderSync());
					var i = O.createNode(null, '/', O.DIR_MODE, 0),
						o = {};
					function n(t) {
						for (var e = t.split('/'), r = i, n = 0; n < e.length - 1; n++) {
							var a = e.slice(0, n + 1).join('/');
							o[a] || (o[a] = O.createNode(r, e[n], O.DIR_MODE, 0)), (r = o[a]);
						}
						return r;
					}
					function a(t) {
						t = t.split('/');
						return t[t.length - 1];
					}
					return (
						Array.prototype.forEach.call(t.opts.files || [], function (t) {
							O.createNode(n(t.name), a(t.name), O.FILE_MODE, 0, t, t.lastModifiedDate);
						}),
						(t.opts.blobs || []).forEach(function (t) {
							O.createNode(n(t.name), a(t.name), O.FILE_MODE, 0, t.data);
						}),
						(t.opts.packages || []).forEach(function (r) {
							r.metadata.files.forEach(function (t) {
								var e = t.filename.substr(1);
								O.createNode(n(e), a(e), O.FILE_MODE, 0, r.blob.slice(t.start, t.end));
							});
						}),
						i
					);
				},
				createNode: function (t, e, r, n, a, i) {
					var o = S.createNode(t, e, r);
					return (
						(o.mode = r),
						(o.node_ops = O.node_ops),
						(o.stream_ops = O.stream_ops),
						(o.timestamp = (i || new Date()).getTime()),
						ot(O.FILE_MODE !== O.DIR_MODE),
						r === O.FILE_MODE
							? ((o.size = a.size), (o.contents = a))
							: ((o.size = 4096), (o.contents = {})),
						t && (t.contents[e] = o),
						o
					);
				},
				node_ops: {
					getattr: function (t) {
						return {
							dev: 1,
							ino: t.id,
							mode: t.mode,
							nlink: 1,
							uid: 0,
							gid: 0,
							rdev: void 0,
							size: t.size,
							atime: new Date(t.timestamp),
							mtime: new Date(t.timestamp),
							ctime: new Date(t.timestamp),
							blksize: 4096,
							blocks: Math.ceil(t.size / 4096),
						};
					},
					setattr: function (t, e) {
						void 0 !== e.mode && (t.mode = e.mode),
							void 0 !== e.timestamp && (t.timestamp = e.timestamp);
					},
					lookup: function (t, e) {
						throw new S.ErrnoError(44);
					},
					mknod: function (t, e, r, n) {
						throw new S.ErrnoError(63);
					},
					rename: function (t, e, r) {
						throw new S.ErrnoError(63);
					},
					unlink: function (t, e) {
						throw new S.ErrnoError(63);
					},
					rmdir: function (t, e) {
						throw new S.ErrnoError(63);
					},
					readdir: function (t) {
						var e,
							r = ['.', '..'];
						for (e in t.contents) t.contents.hasOwnProperty(e) && r.push(e);
						return r;
					},
					symlink: function (t, e, r) {
						throw new S.ErrnoError(63);
					},
					readlink: function (t) {
						throw new S.ErrnoError(63);
					},
				},
				stream_ops: {
					read: function (t, e, r, n, a) {
						if (a >= t.node.size) return 0;
						(t = t.node.contents.slice(a, a + n)), (a = O.reader.readAsArrayBuffer(t));
						return e.set(new Uint8Array(a), r), t.size;
					},
					write: function (t, e, r, n, a) {
						throw new S.ErrnoError(29);
					},
					llseek: function (t, e, r) {
						if (
							(1 === r ? (e += t.position) : 2 === r && S.isFile(t.node.mode) && (e += t.node.size),
							e < 0)
						)
							throw new S.ErrnoError(28);
						return e;
					},
				},
			},
			S = {
				root: null,
				mounts: [],
				devices: {},
				streams: [],
				nextInode: 1,
				nameTable: null,
				currentPath: '/',
				initialized: !1,
				ignorePermissions: !0,
				ErrnoError: null,
				genericErrors: {},
				filesystems: null,
				syncFSRequests: 0,
				lookupPath: function (t) {
					var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
					if (!(t = A.resolve(S.cwd(), t))) return { path: '', node: null };
					if (8 < (e = Object.assign({ follow_mount: !0, recurse_count: 0 }, e)).recurse_count)
						throw new S.ErrnoError(32);
					for (
						var r = D.normalizeArray(
								t.split('/').filter(function (t) {
									return !!t;
								}),
								!1,
							),
							n = S.root,
							a = '/',
							i = 0;
						i < r.length;
						i++
					) {
						var o = i === r.length - 1;
						if (o && e.parent) break;
						if (
							((n = S.lookupNode(n, r[i])),
							(a = D.join2(a, r[i])),
							!S.isMountpoint(n) || (o && !e.follow_mount) || (n = n.mounted.root),
							!o || e.follow)
						)
							for (var s = 0; S.isLink(n.mode); ) {
								var u = S.readlink(a),
									a = A.resolve(D.dirname(a), u),
									n = S.lookupPath(a, { recurse_count: e.recurse_count + 1 }).node;
								if (40 < s++) throw new S.ErrnoError(32);
							}
					}
					return { path: a, node: n };
				},
				getPath: function (t) {
					for (var e, r; ; ) {
						if (S.isRoot(t))
							return (
								(r = t.mount.mountpoint), e ? ('/' !== r[r.length - 1] ? r + '/' + e : r + e) : r
							);
						(e = e ? t.name + '/' + e : t.name), (t = t.parent);
					}
				},
				hashName: function (t, e) {
					for (var r = 0, n = 0; n < e.length; n++) r = ((r << 5) - r + e.charCodeAt(n)) | 0;
					return ((t + r) >>> 0) % S.nameTable.length;
				},
				hashAddNode: function (t) {
					var e = S.hashName(t.parent.id, t.name);
					(t.name_next = S.nameTable[e]), (S.nameTable[e] = t);
				},
				hashRemoveNode: function (t) {
					var e = S.hashName(t.parent.id, t.name);
					if (S.nameTable[e] === t) S.nameTable[e] = t.name_next;
					else
						for (var r = S.nameTable[e]; r; ) {
							if (r.name_next === t) {
								r.name_next = t.name_next;
								break;
							}
							r = r.name_next;
						}
				},
				lookupNode: function (t, e) {
					var r = S.mayLookup(t);
					if (r) throw new S.ErrnoError(r, t);
					for (var r = S.hashName(t.id, e), n = S.nameTable[r]; n; n = n.name_next) {
						var a = n.name;
						if (n.parent.id === t.id && a === e) return n;
					}
					return S.lookup(t, e);
				},
				createNode: function (t, e, r, n) {
					t = new S.FSNode(t, e, r, n);
					return S.hashAddNode(t), t;
				},
				destroyNode: function (t) {
					S.hashRemoveNode(t);
				},
				isRoot: function (t) {
					return t === t.parent;
				},
				isMountpoint: function (t) {
					return !!t.mounted;
				},
				isFile: function (t) {
					return 32768 == (61440 & t);
				},
				isDir: function (t) {
					return 16384 == (61440 & t);
				},
				isLink: function (t) {
					return 40960 == (61440 & t);
				},
				isChrdev: function (t) {
					return 8192 == (61440 & t);
				},
				isBlkdev: function (t) {
					return 24576 == (61440 & t);
				},
				isFIFO: function (t) {
					return 4096 == (61440 & t);
				},
				isSocket: function (t) {
					return 49152 == (49152 & t);
				},
				flagModes: { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
				modeStringToFlags: function (t) {
					var e = S.flagModes[t];
					if (void 0 === e) throw new Error('Unknown file open mode: ' + t);
					return e;
				},
				flagsToPermissionString: function (t) {
					var e = ['r', 'w', 'rw'][3 & t];
					return 512 & t && (e += 'w'), e;
				},
				nodePermissions: function (t, e) {
					return S.ignorePermissions ||
						((!e.includes('r') || 292 & t.mode) &&
							(!e.includes('w') || 146 & t.mode) &&
							(!e.includes('x') || 73 & t.mode))
						? 0
						: 2;
				},
				mayLookup: function (t) {
					var e = S.nodePermissions(t, 'x');
					return e || (t.node_ops.lookup ? 0 : 2);
				},
				mayCreate: function (t, e) {
					try {
						S.lookupNode(t, e);
						return 20;
					} catch (t) {}
					return S.nodePermissions(t, 'wx');
				},
				mayDelete: function (t, e, r) {
					var n;
					try {
						n = S.lookupNode(t, e);
					} catch (t) {
						return t.errno;
					}
					e = S.nodePermissions(t, 'wx');
					if (e) return e;
					if (r) {
						if (!S.isDir(n.mode)) return 54;
						if (S.isRoot(n) || S.getPath(n) === S.cwd()) return 10;
					} else if (S.isDir(n.mode)) return 31;
					return 0;
				},
				mayOpen: function (t, e) {
					return t
						? S.isLink(t.mode)
							? 32
							: S.isDir(t.mode) && ('r' !== S.flagsToPermissionString(e) || 512 & e)
							? 31
							: S.nodePermissions(t, S.flagsToPermissionString(e))
						: 44;
				},
				MAX_OPEN_FDS: 4096,
				nextfd: function () {
					for (
						var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
							e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : S.MAX_OPEN_FDS,
							r = t;
						r <= e;
						r++
					)
						if (!S.streams[r]) return r;
					throw new S.ErrnoError(33);
				},
				getStream: function (t) {
					return S.streams[t];
				},
				createStream: function (t, e, r) {
					S.FSStream ||
						((S.FSStream = function () {
							this.shared = {};
						}),
						(S.FSStream.prototype = {}),
						Object.defineProperties(S.FSStream.prototype, {
							object: {
								get: function () {
									return this.node;
								},
								set: function (t) {
									this.node = t;
								},
							},
							isRead: {
								get: function () {
									return 1 != (2097155 & this.flags);
								},
							},
							isWrite: {
								get: function () {
									return 0 != (2097155 & this.flags);
								},
							},
							isAppend: {
								get: function () {
									return 1024 & this.flags;
								},
							},
							flags: {
								get: function () {
									return this.shared.flags;
								},
								set: function (t) {
									this.shared.flags = t;
								},
							},
							position: {
								get: function () {
									return this.shared.position;
								},
								set: function (t) {
									this.shared.position = t;
								},
							},
						})),
						(t = Object.assign(new S.FSStream(), t));
					e = S.nextfd(e, r);
					return (t.fd = e), (S.streams[e] = t);
				},
				closeStream: function (t) {
					S.streams[t] = null;
				},
				chrdev_stream_ops: {
					open: function (t) {
						var e = S.getDevice(t.node.rdev);
						(t.stream_ops = e.stream_ops), t.stream_ops.open && t.stream_ops.open(t);
					},
					llseek: function () {
						throw new S.ErrnoError(70);
					},
				},
				major: function (t) {
					return t >> 8;
				},
				minor: function (t) {
					return 255 & t;
				},
				makedev: function (t, e) {
					return (t << 8) | e;
				},
				registerDevice: function (t, e) {
					S.devices[t] = { stream_ops: e };
				},
				getDevice: function (t) {
					return S.devices[t];
				},
				getMounts: function (t) {
					for (var e = [], r = [t]; r.length; ) {
						var n = r.pop();
						e.push(n), r.push.apply(r, n.mounts);
					}
					return e;
				},
				syncfs: function (e, r) {
					'function' == typeof e && ((r = e), (e = !1)),
						S.syncFSRequests++,
						1 < S.syncFSRequests &&
							f(
								'warning: ' +
									S.syncFSRequests +
									' FS.syncfs operations in flight at once, probably just doing extra work',
							);
					var n = S.getMounts(S.root.mount),
						a = 0;
					function i(t) {
						return S.syncFSRequests--, r(t);
					}
					function o(t) {
						if (t) return o.errored ? void 0 : ((o.errored = !0), i(t));
						++a >= n.length && i(null);
					}
					n.forEach(function (t) {
						if (!t.type.syncfs) return o(null);
						t.type.syncfs(t, e, o);
					});
				},
				mount: function (t, e, r) {
					var n,
						a = '/' === r,
						i = !r;
					if (a && S.root) throw new S.ErrnoError(10);
					if (!a && !i) {
						i = S.lookupPath(r, { follow_mount: !1 });
						if (((r = i.path), (n = i.node), S.isMountpoint(n))) throw new S.ErrnoError(10);
						if (!S.isDir(n.mode)) throw new S.ErrnoError(54);
					}
					(i = { type: t, opts: e, mountpoint: r, mounts: [] }), (e = t.mount(i));
					return (
						((e.mount = i).root = e),
						a ? (S.root = e) : n && ((n.mounted = i), n.mount && n.mount.mounts.push(i)),
						e
					);
				},
				unmount: function (t) {
					t = S.lookupPath(t, { follow_mount: !1 });
					if (!S.isMountpoint(t.node)) throw new S.ErrnoError(28);
					var t = t.node,
						e = t.mounted,
						n = S.getMounts(e),
						e =
							(Object.keys(S.nameTable).forEach(function (t) {
								for (var e = S.nameTable[t]; e; ) {
									var r = e.name_next;
									n.includes(e.mount) && S.destroyNode(e), (e = r);
								}
							}),
							(t.mounted = null),
							t.mount.mounts.indexOf(e));
					t.mount.mounts.splice(e, 1);
				},
				lookup: function (t, e) {
					return t.node_ops.lookup(t, e);
				},
				mknod: function (t, e, r) {
					var n = S.lookupPath(t, { parent: !0 }).node,
						t = D.basename(t);
					if (!t || '.' === t || '..' === t) throw new S.ErrnoError(28);
					var a = S.mayCreate(n, t);
					if (a) throw new S.ErrnoError(a);
					if (n.node_ops.mknod) return n.node_ops.mknod(n, t, e, r);
					throw new S.ErrnoError(63);
				},
				create: function (t, e) {
					return S.mknod(t, (e = ((e = void 0 !== e ? e : 438) & 4095) | 32768), 0);
				},
				mkdir: function (t, e) {
					return S.mknod(t, (e = ((e = void 0 !== e ? e : 511) & 1023) | 16384), 0);
				},
				mkdirTree: function (t, e) {
					for (var r = t.split('/'), n = '', a = 0; a < r.length; ++a)
						if (r[a]) {
							n += '/' + r[a];
							try {
								S.mkdir(n, e);
							} catch (t) {
								if (20 != t.errno) throw t;
							}
						}
				},
				mkdev: function (t, e, r) {
					return void 0 === r && ((r = e), (e = 438)), S.mknod(t, (e |= 8192), r);
				},
				symlink: function (t, e) {
					if (!A.resolve(t)) throw new S.ErrnoError(44);
					var r = S.lookupPath(e, { parent: !0 }).node;
					if (!r) throw new S.ErrnoError(44);
					var e = D.basename(e),
						n = S.mayCreate(r, e);
					if (n) throw new S.ErrnoError(n);
					if (r.node_ops.symlink) return r.node_ops.symlink(r, e, t);
					throw new S.ErrnoError(63);
				},
				rename: function (t, e) {
					var r = D.dirname(t),
						n = D.dirname(e),
						a = D.basename(t),
						i = D.basename(e),
						o = S.lookupPath(t, { parent: !0 }),
						o = o.node,
						s = S.lookupPath(e, { parent: !0 }).node;
					if (!o || !s) throw new S.ErrnoError(44);
					if (o.mount !== s.mount) throw new S.ErrnoError(75);
					var u,
						c = S.lookupNode(o, a),
						t = A.relative(t, n);
					if ('.' !== t.charAt(0)) throw new S.ErrnoError(28);
					if ('.' !== (t = A.relative(e, r)).charAt(0)) throw new S.ErrnoError(55);
					try {
						u = S.lookupNode(s, i);
					} catch (t) {}
					if (c !== u) {
						(n = S.isDir(c.mode)), (e = S.mayDelete(o, a, n));
						if (e) throw new S.ErrnoError(e);
						if ((e = u ? S.mayDelete(s, i, n) : S.mayCreate(s, i))) throw new S.ErrnoError(e);
						if (!o.node_ops.rename) throw new S.ErrnoError(63);
						if (S.isMountpoint(c) || (u && S.isMountpoint(u))) throw new S.ErrnoError(10);
						if (s !== o && (e = S.nodePermissions(o, 'w'))) throw new S.ErrnoError(e);
						S.hashRemoveNode(c);
						try {
							o.node_ops.rename(c, s, i);
						} catch (t) {
							throw t;
						} finally {
							S.hashAddNode(c);
						}
					}
				},
				rmdir: function (t) {
					var e = S.lookupPath(t, { parent: !0 }).node,
						t = D.basename(t),
						r = S.lookupNode(e, t),
						n = S.mayDelete(e, t, !0);
					if (n) throw new S.ErrnoError(n);
					if (!e.node_ops.rmdir) throw new S.ErrnoError(63);
					if (S.isMountpoint(r)) throw new S.ErrnoError(10);
					e.node_ops.rmdir(e, t), S.destroyNode(r);
				},
				readdir: function (t) {
					t = S.lookupPath(t, { follow: !0 }).node;
					if (t.node_ops.readdir) return t.node_ops.readdir(t);
					throw new S.ErrnoError(54);
				},
				unlink: function (t) {
					var e = S.lookupPath(t, { parent: !0 }).node;
					if (!e) throw new S.ErrnoError(44);
					var t = D.basename(t),
						r = S.lookupNode(e, t),
						n = S.mayDelete(e, t, !1);
					if (n) throw new S.ErrnoError(n);
					if (!e.node_ops.unlink) throw new S.ErrnoError(63);
					if (S.isMountpoint(r)) throw new S.ErrnoError(10);
					e.node_ops.unlink(e, t), S.destroyNode(r);
				},
				readlink: function (t) {
					t = S.lookupPath(t).node;
					if (!t) throw new S.ErrnoError(44);
					if (t.node_ops.readlink) return A.resolve(S.getPath(t.parent), t.node_ops.readlink(t));
					throw new S.ErrnoError(28);
				},
				stat: function (t, e) {
					t = S.lookupPath(t, { follow: !e }).node;
					if (!t) throw new S.ErrnoError(44);
					if (t.node_ops.getattr) return t.node_ops.getattr(t);
					throw new S.ErrnoError(63);
				},
				lstat: function (t) {
					return S.stat(t, !0);
				},
				chmod: function (t, e, r) {
					if (
						!(r = 'string' == typeof t ? S.lookupPath(t, { follow: !r }).node : t).node_ops.setattr
					)
						throw new S.ErrnoError(63);
					r.node_ops.setattr(r, { mode: (4095 & e) | (-4096 & r.mode), timestamp: Date.now() });
				},
				lchmod: function (t, e) {
					S.chmod(t, e, !0);
				},
				fchmod: function (t, e) {
					t = S.getStream(t);
					if (!t) throw new S.ErrnoError(8);
					S.chmod(t.node, e);
				},
				chown: function (t, e, r, n) {
					if (
						!(n = 'string' == typeof t ? S.lookupPath(t, { follow: !n }).node : t).node_ops.setattr
					)
						throw new S.ErrnoError(63);
					n.node_ops.setattr(n, { timestamp: Date.now() });
				},
				lchown: function (t, e, r) {
					S.chown(t, e, r, !0);
				},
				fchown: function (t, e, r) {
					t = S.getStream(t);
					if (!t) throw new S.ErrnoError(8);
					S.chown(t.node, e, r);
				},
				truncate: function (t, e) {
					if (e < 0) throw new S.ErrnoError(28);
					if (
						!(t = 'string' == typeof t ? S.lookupPath(t, { follow: !0 }).node : t).node_ops.setattr
					)
						throw new S.ErrnoError(63);
					if (S.isDir(t.mode)) throw new S.ErrnoError(31);
					if (!S.isFile(t.mode)) throw new S.ErrnoError(28);
					var r = S.nodePermissions(t, 'w');
					if (r) throw new S.ErrnoError(r);
					t.node_ops.setattr(t, { size: e, timestamp: Date.now() });
				},
				ftruncate: function (t, e) {
					t = S.getStream(t);
					if (!t) throw new S.ErrnoError(8);
					if (0 == (2097155 & t.flags)) throw new S.ErrnoError(28);
					S.truncate(t.node, e);
				},
				utime: function (t, e, r) {
					t = S.lookupPath(t, { follow: !0 }).node;
					t.node_ops.setattr(t, { timestamp: Math.max(e, r) });
				},
				open: function (t, e, r) {
					if ('' === t) throw new S.ErrnoError(44);
					if (
						((r = void 0 === r ? 438 : r),
						(r =
							64 & (e = 'string' == typeof e ? S.modeStringToFlags(e) : e)
								? (4095 & r) | 32768
								: 0),
						'object' == Mr(t))
					)
						n = t;
					else {
						t = D.normalize(t);
						try {
							var n = S.lookupPath(t, { follow: !(131072 & e) }).node;
						} catch (t) {}
					}
					var a = !1;
					if (64 & e)
						if (n) {
							if (128 & e) throw new S.ErrnoError(20);
						} else (n = S.mknod(t, r, 0)), (a = !0);
					if (!n) throw new S.ErrnoError(44);
					if ((S.isChrdev(n.mode) && (e &= -513), 65536 & e && !S.isDir(n.mode)))
						throw new S.ErrnoError(54);
					if (!a) {
						r = S.mayOpen(n, e);
						if (r) throw new S.ErrnoError(r);
					}
					512 & e && !a && S.truncate(n, 0), (e &= -131713);
					r = S.createStream({
						node: n,
						path: S.getPath(n),
						flags: e,
						seekable: !0,
						position: 0,
						stream_ops: n.stream_ops,
						ungotten: [],
						error: !1,
					});
					return (
						r.stream_ops.open && r.stream_ops.open(r),
						!c.logReadFiles ||
							1 & e ||
							(S.readFiles || (S.readFiles = {}), t in S.readFiles || (S.readFiles[t] = 1)),
						r
					);
				},
				close: function (t) {
					if (S.isClosed(t)) throw new S.ErrnoError(8);
					t.getdents && (t.getdents = null);
					try {
						t.stream_ops.close && t.stream_ops.close(t);
					} catch (t) {
						throw t;
					} finally {
						S.closeStream(t.fd);
					}
					t.fd = null;
				},
				isClosed: function (t) {
					return null === t.fd;
				},
				llseek: function (t, e, r) {
					if (S.isClosed(t)) throw new S.ErrnoError(8);
					if (!t.seekable || !t.stream_ops.llseek) throw new S.ErrnoError(70);
					if (0 != r && 1 != r && 2 != r) throw new S.ErrnoError(28);
					return (t.position = t.stream_ops.llseek(t, e, r)), (t.ungotten = []), t.position;
				},
				read: function (t, e, r, n, a) {
					if (n < 0 || a < 0) throw new S.ErrnoError(28);
					if (S.isClosed(t)) throw new S.ErrnoError(8);
					if (1 == (2097155 & t.flags)) throw new S.ErrnoError(8);
					if (S.isDir(t.node.mode)) throw new S.ErrnoError(31);
					if (!t.stream_ops.read) throw new S.ErrnoError(28);
					var i = void 0 !== a;
					if (i) {
						if (!t.seekable) throw new S.ErrnoError(70);
					} else a = t.position;
					e = t.stream_ops.read(t, e, r, n, a);
					return i || (t.position += e), e;
				},
				write: function (t, e, r, n, a, i) {
					if (n < 0 || a < 0) throw new S.ErrnoError(28);
					if (S.isClosed(t)) throw new S.ErrnoError(8);
					if (0 == (2097155 & t.flags)) throw new S.ErrnoError(8);
					if (S.isDir(t.node.mode)) throw new S.ErrnoError(31);
					if (!t.stream_ops.write) throw new S.ErrnoError(28);
					t.seekable && 1024 & t.flags && S.llseek(t, 0, 2);
					var o = void 0 !== a;
					if (o) {
						if (!t.seekable) throw new S.ErrnoError(70);
					} else a = t.position;
					e = t.stream_ops.write(t, e, r, n, a, i);
					return o || (t.position += e), e;
				},
				allocate: function (t, e, r) {
					if (S.isClosed(t)) throw new S.ErrnoError(8);
					if (e < 0 || r <= 0) throw new S.ErrnoError(28);
					if (0 == (2097155 & t.flags)) throw new S.ErrnoError(8);
					if (!S.isFile(t.node.mode) && !S.isDir(t.node.mode)) throw new S.ErrnoError(43);
					if (!t.stream_ops.allocate) throw new S.ErrnoError(138);
					t.stream_ops.allocate(t, e, r);
				},
				mmap: function (t, e, r, n, a) {
					if (0 != (2 & n) && 0 == (2 & a) && 2 != (2097155 & t.flags)) throw new S.ErrnoError(2);
					if (1 == (2097155 & t.flags)) throw new S.ErrnoError(2);
					if (t.stream_ops.mmap) return t.stream_ops.mmap(t, e, r, n, a);
					throw new S.ErrnoError(43);
				},
				msync: function (t, e, r, n, a) {
					return t && t.stream_ops.msync ? t.stream_ops.msync(t, e, r, n, a) : 0;
				},
				munmap: function (t) {
					return 0;
				},
				ioctl: function (t, e, r) {
					if (t.stream_ops.ioctl) return t.stream_ops.ioctl(t, e, r);
					throw new S.ErrnoError(59);
				},
				readFile: function (t) {
					var e,
						r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
					if (
						((r.flags = r.flags || 0),
						(r.encoding = r.encoding || 'binary'),
						'utf8' !== r.encoding && 'binary' !== r.encoding)
					)
						throw new Error('Invalid encoding type "' + r.encoding + '"');
					var n = S.open(t, r.flags),
						t = S.stat(t).size,
						a = new Uint8Array(t);
					return (
						S.read(n, a, 0, t, 0),
						'utf8' === r.encoding ? (e = dt(a, 0)) : 'binary' === r.encoding && (e = a),
						S.close(n),
						e
					);
				},
				writeFile: function (t, e) {
					var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
						t = ((r.flags = r.flags || 577), S.open(t, r.flags, r.mode));
					if ('string' == typeof e) {
						var n = new Uint8Array(ht(e) + 1),
							a = pt(e, n, 0, n.length);
						S.write(t, n, 0, a, void 0, r.canOwn);
					} else {
						if (!ArrayBuffer.isView(e)) throw new Error('Unsupported data type');
						S.write(t, e, 0, e.byteLength, void 0, r.canOwn);
					}
					S.close(t);
				},
				cwd: function () {
					return S.currentPath;
				},
				chdir: function (t) {
					t = S.lookupPath(t, { follow: !0 });
					if (null === t.node) throw new S.ErrnoError(44);
					if (!S.isDir(t.node.mode)) throw new S.ErrnoError(54);
					var e = S.nodePermissions(t.node, 'x');
					if (e) throw new S.ErrnoError(e);
					S.currentPath = t.path;
				},
				createDefaultDirectories: function () {
					S.mkdir('/tmp'), S.mkdir('/home'), S.mkdir('/home/web_user');
				},
				createDefaultDevices: function () {
					S.mkdir('/dev'),
						S.registerDevice(S.makedev(1, 3), {
							read: function () {
								return 0;
							},
							write: function (t, e, r, n, a) {
								return n;
							},
						}),
						S.mkdev('/dev/null', S.makedev(1, 3)),
						n.register(S.makedev(5, 0), n.default_tty_ops),
						n.register(S.makedev(6, 0), n.default_tty1_ops),
						S.mkdev('/dev/tty', S.makedev(5, 0)),
						S.mkdev('/dev/tty1', S.makedev(6, 0));
					var t = kt();
					S.createDevice('/dev', 'random', t),
						S.createDevice('/dev', 'urandom', t),
						S.mkdir('/dev/shm'),
						S.mkdir('/dev/shm/tmp');
				},
				createSpecialDirectories: function () {
					S.mkdir('/proc');
					var e = S.mkdir('/proc/self');
					S.mkdir('/proc/self/fd'),
						S.mount(
							{
								mount: function () {
									var t = S.createNode(e, 'fd', 16895, 73);
									return (
										(t.node_ops = {
											lookup: function (t, e) {
												var r = S.getStream(+e);
												if (!r) throw new S.ErrnoError(8);
												e = {
													parent: null,
													mount: { mountpoint: 'fake' },
													node_ops: {
														readlink: function () {
															return r.path;
														},
													},
												};
												return (e.parent = e);
											},
										}),
										t
									);
								},
							},
							{},
							'/proc/self/fd',
						);
				},
				createStandardStreams: function () {
					c.stdin ? S.createDevice('/dev', 'stdin', c.stdin) : S.symlink('/dev/tty', '/dev/stdin'),
						c.stdout
							? S.createDevice('/dev', 'stdout', null, c.stdout)
							: S.symlink('/dev/tty', '/dev/stdout'),
						c.stderr
							? S.createDevice('/dev', 'stderr', null, c.stderr)
							: S.symlink('/dev/tty1', '/dev/stderr'),
						S.open('/dev/stdin', 0),
						S.open('/dev/stdout', 1),
						S.open('/dev/stderr', 1);
				},
				ensureErrnoError: function () {
					S.ErrnoError ||
						((S.ErrnoError = function (t, e) {
							(this.node = e),
								(this.setErrno = function (t) {
									this.errno = t;
								}),
								this.setErrno(t),
								(this.message = 'FS error');
						}),
						(S.ErrnoError.prototype = new Error()),
						(S.ErrnoError.prototype.constructor = S.ErrnoError),
						[44].forEach(function (t) {
							(S.genericErrors[t] = new S.ErrnoError(t)),
								(S.genericErrors[t].stack = '<generic error, no stack>');
						}));
				},
				staticInit: function () {
					S.ensureErrnoError(),
						(S.nameTable = new Array(4096)),
						S.mount(T, {}, '/'),
						S.createDefaultDirectories(),
						S.createDefaultDevices(),
						S.createSpecialDirectories(),
						(S.filesystems = { MEMFS: T, NODEFS: L, WORKERFS: O });
				},
				init: function (t, e, r) {
					(S.init.initialized = !0),
						S.ensureErrnoError(),
						(c.stdin = t || c.stdin),
						(c.stdout = e || c.stdout),
						(c.stderr = r || c.stderr),
						S.createStandardStreams();
				},
				quit: function () {
					S.init.initialized = !1;
					for (var t = 0; t < S.streams.length; t++) {
						var e = S.streams[t];
						e && S.close(e);
					}
				},
				getMode: function (t, e) {
					var r = 0;
					return t && (r |= 365), e && (r |= 146), r;
				},
				findObject: function (t, e) {
					t = S.analyzePath(t, e);
					return t.exists ? t.object : null;
				},
				analyzePath: function (t, e) {
					try {
						t = (n = S.lookupPath(t, { follow: !e })).path;
					} catch (t) {}
					var r = {
						isRoot: !1,
						exists: !1,
						error: 0,
						name: null,
						path: null,
						object: null,
						parentExists: !1,
						parentPath: null,
						parentObject: null,
					};
					try {
						var n = S.lookupPath(t, { parent: !0 });
						(r.parentExists = !0),
							(r.parentPath = n.path),
							(r.parentObject = n.node),
							(r.name = D.basename(t)),
							(n = S.lookupPath(t, { follow: !e })),
							(r.exists = !0),
							(r.path = n.path),
							(r.object = n.node),
							(r.name = n.node.name),
							(r.isRoot = '/' === n.path);
					} catch (t) {
						r.error = t.errno;
					}
					return r;
				},
				createPath: function (t, e, r, n) {
					t = 'string' == typeof t ? t : S.getPath(t);
					for (var a = e.split('/').reverse(); a.length; ) {
						var i = a.pop();
						if (i) {
							var o = D.join2(t, i);
							try {
								S.mkdir(o);
							} catch (t) {}
							t = o;
						}
					}
					return o;
				},
				createFile: function (t, e, r, n, a) {
					(t = D.join2('string' == typeof t ? t : S.getPath(t), e)), (e = S.getMode(n, a));
					return S.create(t, e);
				},
				createDataFile: function (t, e, r, n, a, i) {
					var o = e,
						e =
							(t && ((t = 'string' == typeof t ? t : S.getPath(t)), (o = e ? D.join2(t, e) : t)),
							S.getMode(n, a)),
						t = S.create(o, e);
					if (r) {
						if ('string' == typeof r) {
							for (var s = new Array(r.length), u = 0, c = r.length; u < c; ++u)
								s[u] = r.charCodeAt(u);
							r = s;
						}
						S.chmod(t, 146 | e);
						n = S.open(t, 577);
						S.write(n, r, 0, r.length, 0, i), S.close(n), S.chmod(t, e);
					}
					return t;
				},
				createDevice: function (t, e, u, o) {
					var t = D.join2('string' == typeof t ? t : S.getPath(t), e),
						e = S.getMode(!!u, !!o),
						r =
							(S.createDevice.major || (S.createDevice.major = 64),
							S.makedev(S.createDevice.major++, 0));
					return (
						S.registerDevice(r, {
							open: function (t) {
								t.seekable = !1;
							},
							close: function (t) {
								o && o.buffer && o.buffer.length && o(10);
							},
							read: function (t, e, r, n, a) {
								for (var i, o = 0, s = 0; s < n; s++) {
									try {
										i = u();
									} catch (t) {
										throw new S.ErrnoError(29);
									}
									if (void 0 === i && 0 === o) throw new S.ErrnoError(6);
									if (null == i) break;
									o++, (e[r + s] = i);
								}
								return o && (t.node.timestamp = Date.now()), o;
							},
							write: function (t, e, r, n, a) {
								for (var i = 0; i < n; i++)
									try {
										o(e[r + i]);
									} catch (t) {
										throw new S.ErrnoError(29);
									}
								return n && (t.node.timestamp = Date.now()), i;
							},
						}),
						S.mkdev(t, e, r)
					);
				},
				forceLoadFile: function (t) {
					if (t.isDevice || t.isFolder || t.link || t.contents) return !0;
					if ('undefined' != typeof XMLHttpRequest)
						throw new Error(
							'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.',
						);
					if (!H) throw new Error('Cannot load without read() or XMLHttpRequest.');
					try {
						(t.contents = Mt(H(t.url), !0)), (t.usedBytes = t.contents.length);
					} catch (t) {
						throw new S.ErrnoError(29);
					}
				},
				createLazyFile: function (t, e, o, r, n) {
					function a() {
						(this.lengthKnown = !1), (this.chunks = []);
					}
					if (
						((a.prototype.get = function (t) {
							var e;
							if (!(t > this.length - 1 || t < 0))
								return (e = t % this.chunkSize), (t = (t / this.chunkSize) | 0), this.getter(t)[e];
						}),
						(a.prototype.setDataGetter = function (t) {
							this.getter = t;
						}),
						(a.prototype.cacheLength = function () {
							var t = new XMLHttpRequest();
							if (
								(t.open('HEAD', o, !1),
								t.send(null),
								!((200 <= t.status && t.status < 300) || 304 === t.status))
							)
								throw new Error("Couldn't load " + o + '. Status: ' + t.status);
							var e,
								n = Number(t.getResponseHeader('Content-length')),
								r = (e = t.getResponseHeader('Accept-Ranges')) && 'bytes' === e,
								t = (e = t.getResponseHeader('Content-Encoding')) && 'gzip' === e,
								a = 1048576,
								i = (r || (a = n), this);
							i.setDataGetter(function (t) {
								var e = t * a,
									r = (t + 1) * a - 1,
									r = Math.min(r, n - 1);
								if (
									(void 0 === i.chunks[t] &&
										(i.chunks[t] = (function (t, e) {
											if (e < t)
												throw new Error(
													'invalid range (' + t + ', ' + e + ') or no bytes requested!',
												);
											if (n - 1 < e)
												throw new Error('only ' + n + ' bytes available! programmer error!');
											var r = new XMLHttpRequest();
											if (
												(r.open('GET', o, !1),
												n !== a && r.setRequestHeader('Range', 'bytes=' + t + '-' + e),
												(r.responseType = 'arraybuffer'),
												r.overrideMimeType &&
													r.overrideMimeType('text/plain; charset=x-user-defined'),
												r.send(null),
												(200 <= r.status && r.status < 300) || 304 === r.status)
											)
												return void 0 !== r.response
													? new Uint8Array(r.response || [])
													: Mt(r.responseText || '', !0);
											throw new Error("Couldn't load " + o + '. Status: ' + r.status);
										})(e, r)),
									void 0 === i.chunks[t])
								)
									throw new Error('doXHR failed!');
								return i.chunks[t];
							}),
								(!t && n) ||
									((a = n = 1),
									(n = this.getter(0).length),
									(a = n),
									rt(
										'LazyFiles on gzip forces download of the whole file when length is accessed',
									)),
								(this._length = n),
								(this._chunkSize = a),
								(this.lengthKnown = !0);
						}),
						'undefined' != typeof XMLHttpRequest)
					) {
						if (!l)
							throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
						var i = new a(),
							i =
								(Object.defineProperties(i, {
									length: {
										get: function () {
											return this.lengthKnown || this.cacheLength(), this._length;
										},
									},
									chunkSize: {
										get: function () {
											return this.lengthKnown || this.cacheLength(), this._chunkSize;
										},
									},
								}),
								{ isDevice: !1, contents: i });
					} else i = { isDevice: !1, url: o };
					var s = S.createFile(t, e, i, r, n),
						u =
							(i.contents
								? (s.contents = i.contents)
								: i.url && ((s.contents = null), (s.url = i.url)),
							Object.defineProperties(s, {
								usedBytes: {
									get: function () {
										return this.contents.length;
									},
								},
							}),
							{});
					function c(t, e, r, n, a) {
						var i = t.node.contents;
						if (a >= i.length) return 0;
						var o = Math.min(i.length - a, n);
						if (i.slice) for (var s = 0; s < o; s++) e[r + s] = i[a + s];
						else for (s = 0; s < o; s++) e[r + s] = i.get(a + s);
						return o;
					}
					return (
						Object.keys(s.stream_ops).forEach(function (t) {
							var e = s.stream_ops[t];
							u[t] = function () {
								return S.forceLoadFile(s), e.apply(null, arguments);
							};
						}),
						(u.read = function (t, e, r, n, a) {
							return S.forceLoadFile(s), c(t, e, r, n, a);
						}),
						(u.mmap = function (t, e, r, n, a) {
							S.forceLoadFile(s);
							var i = It(e);
							if (i) return c(t, d, i, e, r), { ptr: i, allocated: !0 };
							throw new S.ErrnoError(48);
						}),
						(s.stream_ops = u),
						s
					);
				},
				createPreloadedFile: function (r, n, t, a, i, o, s, u, c, l) {
					var e,
						f,
						d,
						p,
						m,
						h = n ? A.resolve(D.join2(r, n)) : r;
					function y(t) {
						function e(t) {
							l && l(), u || S.createDataFile(r, n, t, a, i, c), o && o(), At();
						}
						Browser.handledByPreloadPlugin(t, h, e, function () {
							s && s(), At();
						}) || e(t);
					}
					Dt(),
						'string' == typeof t
							? ((e = t),
							  (f = function (t) {
									y(t);
							  }),
							  (d = s),
							  (m = p ? '' : 'al ' + e),
							  X(
									e,
									function (t) {
										ot(t, 'Loading data file "' + e + '" failed (no arrayBuffer).'),
											f(new Uint8Array(t)),
											m && At();
									},
									function (t) {
										if (!d) throw 'Loading data file "' + e + '" failed.';
										d();
									},
							  ),
							  m && Dt())
							: y(t);
				},
				indexedDB: function () {
					return (
						window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
					);
				},
				DB_NAME: function () {
					return 'EM_FS_' + window.location.pathname;
				},
				DB_VERSION: 20,
				DB_STORE_NAME: 'FILE_DATA',
				saveFilesToDB: function (o, s, u) {
					(s = s || function () {}), (u = u || function () {});
					var t = S.indexedDB();
					try {
						var c = t.open(S.DB_NAME(), S.DB_VERSION);
					} catch (t) {
						return u(t);
					}
					(c.onupgradeneeded = function () {
						rt('creating db'), c.result.createObjectStore(S.DB_STORE_NAME);
					}),
						(c.onsuccess = function () {
							var t = c.result.transaction([S.DB_STORE_NAME], 'readwrite'),
								e = t.objectStore(S.DB_STORE_NAME),
								r = 0,
								n = 0,
								a = o.length;
							function i() {
								(0 == n ? s : u)();
							}
							o.forEach(function (t) {
								t = e.put(S.analyzePath(t).object.contents, t);
								(t.onsuccess = function () {
									++r + n == a && i();
								}),
									(t.onerror = function () {
										r + ++n == a && i();
									});
							}),
								(t.onerror = u);
						}),
						(c.onerror = u);
				},
				loadFilesFromDB: function (s, u, c) {
					(u = u || function () {}), (c = c || function () {});
					var t = S.indexedDB();
					try {
						var l = t.open(S.DB_NAME(), S.DB_VERSION);
					} catch (t) {
						return c(t);
					}
					(l.onupgradeneeded = c),
						(l.onsuccess = function () {
							var t = l.result;
							try {
								var e = t.transaction([S.DB_STORE_NAME], 'readonly');
							} catch (t) {
								return void c(t);
							}
							var r = e.objectStore(S.DB_STORE_NAME),
								n = 0,
								a = 0,
								i = s.length;
							function o() {
								(0 == a ? u : c)();
							}
							s.forEach(function (t) {
								var e = r.get(t);
								(e.onsuccess = function () {
									S.analyzePath(t).exists && S.unlink(t),
										S.createDataFile(D.dirname(t), D.basename(t), e.result, !0, !0, !0),
										++n + a == i && o();
								}),
									(e.onerror = function () {
										n + ++a == i && o();
									});
							}),
								(e.onerror = c);
						}),
						(l.onerror = c);
				},
			},
			G = {
				DEFAULT_POLLMASK: 5,
				calculateAt: function (t, e, r) {
					if (D.isAbs(e)) return e;
					var n;
					if (-100 === t) n = S.cwd();
					else {
						t = S.getStream(t);
						if (!t) throw new S.ErrnoError(8);
						n = t.path;
					}
					if (0 != e.length) return D.join2(n, e);
					if (r) return n;
					throw new S.ErrnoError(44);
				},
				doStat: function (t, e, r) {
					try {
						var n = t(e);
					} catch (t) {
						if (t && t.node && D.normalize(e) !== D.normalize(S.getPath(t.node))) return -54;
						throw t;
					}
					return (
						(_[r >> 2] = n.dev),
						(_[(r + 4) >> 2] = 0),
						(_[(r + 8) >> 2] = n.ino),
						(_[(r + 12) >> 2] = n.mode),
						(_[(r + 16) >> 2] = n.nlink),
						(_[(r + 20) >> 2] = n.uid),
						(_[(r + 24) >> 2] = n.gid),
						(_[(r + 28) >> 2] = n.rdev),
						(_[(r + 32) >> 2] = 0),
						(w = [
							n.size >>> 0,
							((E = n.size),
							1 <= +Math.abs(E)
								? 0 < E
									? (0 | Math.min(+Math.floor(E / 4294967296), 4294967295)) >>> 0
									: ~~+Math.ceil((E - (~~E >>> 0)) / 4294967296) >>> 0
								: 0),
						]),
						(_[(r + 40) >> 2] = w[0]),
						(_[(r + 44) >> 2] = w[1]),
						(_[(r + 48) >> 2] = 4096),
						(_[(r + 52) >> 2] = n.blocks),
						(_[(r + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
						(_[(r + 64) >> 2] = 0),
						(_[(r + 72) >> 2] = (n.mtime.getTime() / 1e3) | 0),
						(_[(r + 80) >> 2] = 0),
						(_[(r + 88) >> 2] = (n.ctime.getTime() / 1e3) | 0),
						(_[(r + 96) >> 2] = 0),
						(w = [
							n.ino >>> 0,
							((E = n.ino),
							1 <= +Math.abs(E)
								? 0 < E
									? (0 | Math.min(+Math.floor(E / 4294967296), 4294967295)) >>> 0
									: ~~+Math.ceil((E - (~~E >>> 0)) / 4294967296) >>> 0
								: 0),
						]),
						(_[(r + 104) >> 2] = w[0]),
						(_[(r + 108) >> 2] = w[1]),
						0
					);
				},
				doMsync: function (t, e, r, n, a) {
					t = p.slice(t, t + r);
					S.msync(e, t, a, r, n);
				},
				varargs: void 0,
				get: function () {
					return (G.varargs += 4), _[(G.varargs - 4) >> 2];
				},
				getStr: function (t) {
					return g(t);
				},
				getStreamFromFD: function (t) {
					t = S.getStream(t);
					if (t) return t;
					throw new S.ErrnoError(8);
				},
			};
		function Bt(t, e) {
			return (e + 2097152) >>> 0 < 4194305 - !!t ? (t >>> 0) + 4294967296 * e : NaN;
		}
		var N = {
				BUCKET_BUFFER_SIZE: 8192,
				mount: function (t) {
					return S.createNode(null, '/', 16895, 0);
				},
				createPipe: function () {
					var t = { buckets: [], refcnt: 2 },
						e =
							(t.buckets.push({
								buffer: new Uint8Array(N.BUCKET_BUFFER_SIZE),
								offset: 0,
								roffset: 0,
							}),
							N.nextname()),
						r = N.nextname(),
						n = S.createNode(N.root, e, 4096, 0),
						a = S.createNode(N.root, r, 4096, 0),
						t =
							((n.pipe = t),
							(a.pipe = t),
							S.createStream({
								path: e,
								node: n,
								flags: 0,
								seekable: !1,
								stream_ops: N.stream_ops,
							})),
						e =
							((n.stream = t),
							S.createStream({
								path: r,
								node: a,
								flags: 1,
								seekable: !1,
								stream_ops: N.stream_ops,
							}));
					return (a.stream = e), { readable_fd: t.fd, writable_fd: e.fd };
				},
				stream_ops: {
					poll: function (t) {
						var e = t.node.pipe;
						if (1 == (2097155 & t.flags)) return 260;
						if (0 < e.buckets.length)
							for (var r = 0; r < e.buckets.length; r++) {
								var n = e.buckets[r];
								if (0 < n.offset - n.roffset) return 65;
							}
						return 0;
					},
					ioctl: function (t, e, r) {
						return 28;
					},
					fsync: function (t) {
						return 28;
					},
					read: function (t, e, r, n, a) {
						for (var i = t.node.pipe, o = 0, s = 0; s < i.buckets.length; s++) {
							var u = i.buckets[s];
							o += u.offset - u.roffset;
						}
						ot(e instanceof ArrayBuffer || ArrayBuffer.isView(e));
						var c = e.subarray(r, r + n);
						if (n <= 0) return 0;
						if (0 == o) throw new S.ErrnoError(6);
						for (var l = Math.min(o, n), t = l, f = 0, s = 0; s < i.buckets.length; s++) {
							var d = i.buckets[s],
								p = d.offset - d.roffset;
							if (l <= p) {
								var m = d.buffer.subarray(d.roffset, d.offset);
								l < p ? ((m = m.subarray(0, l)), (d.roffset += l)) : f++, c.set(m);
								break;
							}
							m = d.buffer.subarray(d.roffset, d.offset);
							c.set(m), (c = c.subarray(m.byteLength)), (l -= m.byteLength), f++;
						}
						return (
							f &&
								f == i.buckets.length &&
								((i.buckets[--f].offset = 0), (i.buckets[f].roffset = 0)),
							i.buckets.splice(0, f),
							t
						);
					},
					write: function (t, e, r, n, a) {
						var i = t.node.pipe,
							o = (ot(e instanceof ArrayBuffer || ArrayBuffer.isView(e)), e.subarray(r, r + n)),
							t = o.byteLength;
						if (t <= 0) return 0;
						(e = null),
							0 == i.buckets.length
								? ((e = { buffer: new Uint8Array(N.BUCKET_BUFFER_SIZE), offset: 0, roffset: 0 }),
								  i.buckets.push(e))
								: (e = i.buckets[i.buckets.length - 1]),
							ot(e.offset <= N.BUCKET_BUFFER_SIZE),
							(r = N.BUCKET_BUFFER_SIZE - e.offset);
						if (t <= r) return e.buffer.set(o, e.offset), (e.offset += t), t;
						0 < r &&
							(e.buffer.set(o.subarray(0, r), e.offset),
							(e.offset += r),
							(o = o.subarray(r, o.byteLength)));
						for (
							var s = (o.byteLength / N.BUCKET_BUFFER_SIZE) | 0,
								n = o.byteLength % N.BUCKET_BUFFER_SIZE,
								u = 0;
							u < s;
							u++
						) {
							var c = {
								buffer: new Uint8Array(N.BUCKET_BUFFER_SIZE),
								offset: N.BUCKET_BUFFER_SIZE,
								roffset: 0,
							};
							i.buckets.push(c),
								c.buffer.set(o.subarray(0, N.BUCKET_BUFFER_SIZE)),
								(o = o.subarray(N.BUCKET_BUFFER_SIZE, o.byteLength));
						}
						return (
							0 < n &&
								((c = {
									buffer: new Uint8Array(N.BUCKET_BUFFER_SIZE),
									offset: o.byteLength,
									roffset: 0,
								}),
								i.buckets.push(c),
								c.buffer.set(o)),
							t
						);
					},
					close: function (t) {
						t = t.node.pipe;
						t.refcnt--, 0 === t.refcnt && (t.buckets = null);
					},
				},
				nextname: function () {
					return (
						N.nextname.current || (N.nextname.current = 0), 'pipe[' + N.nextname.current++ + ']'
					);
				},
			},
			Ut =
				'To use dlopen, you need enable dynamic linking, see https://github.com/emscripten-core/emscripten/wiki/Linking';
		function Kt(t) {
			var e = ht(t) + 1,
				r = le(e);
			return r && pt(t, d, r, e), r;
		}
		function zt(t, e, r) {
			var n, a, i, o, s;
			function u(t) {
				t = t.toTimeString().match(/\(([A-Za-z ]+)\)$/);
				return t ? t[1] : 'GMT';
			}
			zt.called ||
				((zt.called = !0),
				(t = t),
				(e = e),
				(r = r),
				(n = new Date().getFullYear()),
				(a = new Date(n, 0, 1)),
				(n = new Date(n, 6, 1)),
				(i = a.getTimezoneOffset()),
				(o = n.getTimezoneOffset()),
				(s = Math.max(i, o)),
				(_[t >> 2] = 60 * s),
				(_[e >> 2] = Number(i != o)),
				(t = u(a)),
				(s = u(n)),
				(e = Kt(t)),
				(a = Kt(s)),
				o < i
					? ((m[r >> 2] = e), (m[(r + 4) >> 2] = a))
					: ((m[r >> 2] = a), (m[(r + 4) >> 2] = e)));
		}
		function Wt() {
			return 2147483648;
		}
		var Yt = o
				? function () {
						var t = process.hrtime();
						return 1e3 * t[0] + t[1] / 1e6;
				  }
				: function () {
						return performance.now();
				  },
			Vt = {};
		function Ht() {
			if (!Ht.strings) {
				var t = {
					USER: 'web_user',
					LOGNAME: 'web_user',
					PATH: '/',
					PWD: '/',
					HOME: '/home/web_user',
					LANG:
						(
							('object' == ('undefined' == typeof navigator ? 'undefined' : Mr(navigator)) &&
								navigator.languages &&
								navigator.languages[0]) ||
							'C'
						).replace('-', '_') + '.UTF-8',
					_: Z || './this.program',
				};
				for (e in Vt) void 0 === Vt[e] ? delete t[e] : (t[e] = Vt[e]);
				var e,
					r = [];
				for (e in t) r.push(e + '=' + t[e]);
				Ht.strings = r;
			}
			return Ht.strings;
		}
		function Xt(t, e) {
			(t = t), at || (c.onExit && c.onExit(t), (it = !0)), J(t, new Ot(t));
		}
		function qt(t, e) {
			qt.randomDevice || (qt.randomDevice = kt());
			for (var r = 0; r < e; r++) d[(t + r) >> 0] = qt.randomDevice();
			return 0;
		}
		function Qt(t) {
			return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
		}
		var Zt = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			Jt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		function $t(t, e, r, n) {
			var a = _[(n + 40) >> 2],
				i = {
					tm_sec: _[n >> 2],
					tm_min: _[(n + 4) >> 2],
					tm_hour: _[(n + 8) >> 2],
					tm_mday: _[(n + 12) >> 2],
					tm_mon: _[(n + 16) >> 2],
					tm_year: _[(n + 20) >> 2],
					tm_wday: _[(n + 24) >> 2],
					tm_yday: _[(n + 28) >> 2],
					tm_isdst: _[(n + 32) >> 2],
					tm_gmtoff: _[(n + 36) >> 2],
					tm_zone: a ? g(a) : '',
				},
				o = g(r),
				s = {
					'%c': '%a %b %d %H:%M:%S %Y',
					'%D': '%m/%d/%y',
					'%F': '%Y-%m-%d',
					'%h': '%b',
					'%r': '%I:%M:%S %p',
					'%R': '%H:%M',
					'%T': '%H:%M:%S',
					'%x': '%m/%d/%y',
					'%X': '%H:%M:%S',
					'%Ec': '%c',
					'%EC': '%C',
					'%Ex': '%m/%d/%y',
					'%EX': '%H:%M:%S',
					'%Ey': '%y',
					'%EY': '%Y',
					'%Od': '%d',
					'%Oe': '%e',
					'%OH': '%H',
					'%OI': '%I',
					'%Om': '%m',
					'%OM': '%M',
					'%OS': '%S',
					'%Ou': '%u',
					'%OU': '%U',
					'%OV': '%V',
					'%Ow': '%w',
					'%OW': '%W',
					'%Oy': '%y',
				};
			for (h in s) o = o.replace(new RegExp(h, 'g'), s[h]);
			var u = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				c = [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				];
			function l(t, e, r) {
				for (var n = 'number' == typeof t ? t.toString() : t || ''; n.length < e; ) n = r[0] + n;
				return n;
			}
			function f(t, e) {
				return l(t, e, '0');
			}
			function d(t, e) {
				function r(t) {
					return t < 0 ? -1 : 0 < t ? 1 : 0;
				}
				var n;
				return (n =
					0 === (n = r(t.getFullYear() - e.getFullYear())) &&
					0 === (n = r(t.getMonth() - e.getMonth()))
						? r(t.getDate() - e.getDate())
						: n);
			}
			function p(t) {
				switch (t.getDay()) {
					case 0:
						return new Date(t.getFullYear() - 1, 11, 29);
					case 1:
						return t;
					case 2:
						return new Date(t.getFullYear(), 0, 3);
					case 3:
						return new Date(t.getFullYear(), 0, 2);
					case 4:
						return new Date(t.getFullYear(), 0, 1);
					case 5:
						return new Date(t.getFullYear() - 1, 11, 31);
					case 6:
						return new Date(t.getFullYear() - 1, 11, 30);
				}
			}
			function m(t) {
				var t = (function (t, e) {
						for (var r = new Date(t.getTime()); 0 < e; ) {
							var n = Qt(r.getFullYear()),
								a = r.getMonth(),
								n = (n ? Zt : Jt)[a];
							if (!(e > n - r.getDate())) return r.setDate(r.getDate() + e), r;
							(e -= n - r.getDate() + 1),
								r.setDate(1),
								a < 11 ? r.setMonth(a + 1) : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
						}
						return r;
					})(new Date(t.tm_year + 1900, 0, 1), t.tm_yday),
					e = new Date(t.getFullYear(), 0, 4),
					r = new Date(t.getFullYear() + 1, 0, 4),
					e = p(e),
					r = p(r);
				return d(e, t) <= 0
					? d(r, t) <= 0
						? t.getFullYear() + 1
						: t.getFullYear()
					: t.getFullYear() - 1;
			}
			var h,
				y = {
					'%a': function (t) {
						return u[t.tm_wday].substring(0, 3);
					},
					'%A': function (t) {
						return u[t.tm_wday];
					},
					'%b': function (t) {
						return c[t.tm_mon].substring(0, 3);
					},
					'%B': function (t) {
						return c[t.tm_mon];
					},
					'%C': function (t) {
						return f(((t.tm_year + 1900) / 100) | 0, 2);
					},
					'%d': function (t) {
						return f(t.tm_mday, 2);
					},
					'%e': function (t) {
						return l(t.tm_mday, 2, ' ');
					},
					'%g': function (t) {
						return m(t).toString().substring(2);
					},
					'%G': m,
					'%H': function (t) {
						return f(t.tm_hour, 2);
					},
					'%I': function (t) {
						t = t.tm_hour;
						return 0 == t ? (t = 12) : 12 < t && (t -= 12), f(t, 2);
					},
					'%j': function (t) {
						return f(
							t.tm_mday +
								(function (t, e) {
									for (var r = 0, n = 0; n <= e; r += t[n++]);
									return r;
								})(Qt(t.tm_year + 1900) ? Zt : Jt, t.tm_mon - 1),
							3,
						);
					},
					'%m': function (t) {
						return f(t.tm_mon + 1, 2);
					},
					'%M': function (t) {
						return f(t.tm_min, 2);
					},
					'%n': function () {
						return '\n';
					},
					'%p': function (t) {
						return 0 <= t.tm_hour && t.tm_hour < 12 ? 'AM' : 'PM';
					},
					'%S': function (t) {
						return f(t.tm_sec, 2);
					},
					'%t': function () {
						return '\t';
					},
					'%u': function (t) {
						return t.tm_wday || 7;
					},
					'%U': function (t) {
						t = t.tm_yday + 7 - t.tm_wday;
						return f(Math.floor(t / 7), 2);
					},
					'%V': function (t) {
						var e,
							r = Math.floor((t.tm_yday + 7 - ((t.tm_wday + 6) % 7)) / 7);
						return (
							(t.tm_wday + 371 - t.tm_yday - 2) % 7 <= 2 && r++,
							r
								? 53 != r ||
								  4 == (e = (t.tm_wday + 371 - t.tm_yday) % 7) ||
								  (3 == e && Qt(t.tm_year)) ||
								  (r = 1)
								: ((r = 52),
								  (4 == (e = (t.tm_wday + 7 - t.tm_yday - 1) % 7) ||
										(5 == e && Qt((t.tm_year % 400) - 1))) &&
										r++),
							f(r, 2)
						);
					},
					'%w': function (t) {
						return t.tm_wday;
					},
					'%W': function (t) {
						t = t.tm_yday + 7 - ((t.tm_wday + 6) % 7);
						return f(Math.floor(t / 7), 2);
					},
					'%y': function (t) {
						return (t.tm_year + 1900).toString().substring(2);
					},
					'%Y': function (t) {
						return t.tm_year + 1900;
					},
					'%z': function (t) {
						var e = 0 <= (t = t.tm_gmtoff),
							t = Math.abs(t) / 60;
						return (e ? '+' : '-') + String('0000' + ((t / 60) * 100 + (t % 60))).slice(-4);
					},
					'%Z': function (t) {
						return t.tm_zone;
					},
					'%%': function () {
						return '%';
					},
				},
				o = o.replace(/%%/g, '\0\0');
			for (h in y) o.includes(h) && (o = o.replace(new RegExp(h, 'g'), y[h](i)));
			n = Mt((o = o.replace(/\0\0/g, '%')), !1);
			return n.length > e ? 0 : (Gt(n, t), n.length - 1);
		}
		function te(t, e) {
			t < 128 ? e.push(t) : e.push(t % 128 | 128, t >> 7);
		}
		function ee(t, e) {
			if ('function' == typeof WebAssembly.Function)
				return new WebAssembly.Function(
					(function (t) {
						for (
							var e = { i: 'i32', j: 'i64', f: 'f32', d: 'f64', p: 'i32' },
								r = { parameters: [], results: 'v' == t[0] ? [] : [e[t[0]]] },
								n = 1;
							n < t.length;
							++n
						)
							r.parameters.push(e[t[n]]);
						return r;
					})(e),
					t,
				);
			var r = [1, 96],
				n = e.slice(0, 1),
				a = e.slice(1),
				i = { i: 127, p: 127, j: 126, f: 125, d: 124 };
			te(a.length, r);
			for (var o = 0; o < a.length; ++o) r.push(i[a[o]]);
			'v' == n ? r.push(0) : r.push(1, i[n]);
			(e = [0, 97, 115, 109, 1, 0, 0, 0, 1]),
				te(r.length, e),
				e.push.apply(e, r),
				e.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0),
				(n = new WebAssembly.Module(new Uint8Array(e)));
			return new WebAssembly.Instance(n, { e: { f: t } }).exports.f;
		}
		var F = void 0,
			re = [];
		function ne(t, e) {
			h.set(t, e), (Nt[t] = h.get(t));
		}
		function ae(t) {
			return c['_' + t];
		}
		function ie(t, e, r, n, a) {
			var i = {
				string: function (t) {
					var e,
						r = 0;
					return null != t && 0 !== t && ((e = 1 + (t.length << 2)), mt(t, (r = pe(e)), e)), r;
				},
				array: function (t) {
					var e = pe(t.length);
					return Gt(t, e), e;
				},
			};
			var t = ae(t),
				o = [],
				s = 0;
			if (n)
				for (var u = 0; u < n.length; u++) {
					var c = i[r[u]];
					c ? (0 === s && (s = P()), (o[u] = c(n[u]))) : (o[u] = n[u]);
				}
			t = t.apply(null, o);
			return (
				(t = t), 0 !== s && R(s), (t = t), 'string' === e ? g(t) : 'boolean' === e ? Boolean(t) : t
			);
		}
		function oe(t, e, r, n) {
			(this.parent = t = t || this),
				(this.mount = t.mount),
				(this.mounted = null),
				(this.id = S.nextInode++),
				(this.name = e),
				(this.mode = r),
				(this.node_ops = {}),
				(this.stream_ops = {}),
				(this.rdev = n);
		}
		Object.defineProperties(oe.prototype, {
			read: {
				get: function () {
					return 365 == (365 & this.mode);
				},
				set: function (t) {
					t ? (this.mode |= 365) : (this.mode &= -366);
				},
			},
			write: {
				get: function () {
					return 146 == (146 & this.mode);
				},
				set: function (t) {
					t ? (this.mode |= 146) : (this.mode &= -147);
				},
			},
			isFolder: {
				get: function () {
					return S.isDir(this.mode);
				},
			},
			isDevice: {
				get: function () {
					return S.isChrdev(this.mode);
				},
			},
		}),
			(S.FSNode = oe),
			S.staticInit(),
			(c.FS_createPath = S.createPath),
			(c.FS_createDataFile = S.createDataFile),
			(c.FS_createPreloadedFile = S.createPreloadedFile),
			(c.FS_unlink = S.unlink),
			(c.FS_createLazyFile = S.createLazyFile),
			(c.FS_createDevice = S.createDevice),
			o && (Q(), L.staticInit()),
			(xt = {
				EPERM: 63,
				ENOENT: 44,
				ESRCH: 71,
				EINTR: 27,
				EIO: 29,
				ENXIO: 60,
				E2BIG: 1,
				ENOEXEC: 45,
				EBADF: 8,
				ECHILD: 12,
				EAGAIN: 6,
				EWOULDBLOCK: 6,
				ENOMEM: 48,
				EACCES: 2,
				EFAULT: 21,
				ENOTBLK: 105,
				EBUSY: 10,
				EEXIST: 20,
				EXDEV: 75,
				ENODEV: 43,
				ENOTDIR: 54,
				EISDIR: 31,
				EINVAL: 28,
				ENFILE: 41,
				EMFILE: 33,
				ENOTTY: 59,
				ETXTBSY: 74,
				EFBIG: 22,
				ENOSPC: 51,
				ESPIPE: 70,
				EROFS: 69,
				EMLINK: 34,
				EPIPE: 64,
				EDOM: 18,
				ERANGE: 68,
				ENOMSG: 49,
				EIDRM: 24,
				ECHRNG: 106,
				EL2NSYNC: 156,
				EL3HLT: 107,
				EL3RST: 108,
				ELNRNG: 109,
				EUNATCH: 110,
				ENOCSI: 111,
				EL2HLT: 112,
				EDEADLK: 16,
				ENOLCK: 46,
				EBADE: 113,
				EBADR: 114,
				EXFULL: 115,
				ENOANO: 104,
				EBADRQC: 103,
				EBADSLT: 102,
				EDEADLOCK: 16,
				EBFONT: 101,
				ENOSTR: 100,
				ENODATA: 116,
				ETIME: 117,
				ENOSR: 118,
				ENONET: 119,
				ENOPKG: 120,
				EREMOTE: 121,
				ENOLINK: 47,
				EADV: 122,
				ESRMNT: 123,
				ECOMM: 124,
				EPROTO: 65,
				EMULTIHOP: 36,
				EDOTDOT: 125,
				EBADMSG: 9,
				ENOTUNIQ: 126,
				EBADFD: 127,
				EREMCHG: 128,
				ELIBACC: 129,
				ELIBBAD: 130,
				ELIBSCN: 131,
				ELIBMAX: 132,
				ELIBEXEC: 133,
				ENOSYS: 52,
				ENOTEMPTY: 55,
				ENAMETOOLONG: 37,
				ELOOP: 32,
				EOPNOTSUPP: 138,
				EPFNOSUPPORT: 139,
				ECONNRESET: 15,
				ENOBUFS: 42,
				EAFNOSUPPORT: 5,
				EPROTOTYPE: 67,
				ENOTSOCK: 57,
				ENOPROTOOPT: 50,
				ESHUTDOWN: 140,
				ECONNREFUSED: 14,
				EADDRINUSE: 3,
				ECONNABORTED: 13,
				ENETUNREACH: 40,
				ENETDOWN: 38,
				ETIMEDOUT: 73,
				EHOSTDOWN: 142,
				EHOSTUNREACH: 23,
				EINPROGRESS: 26,
				EALREADY: 7,
				EDESTADDRREQ: 17,
				EMSGSIZE: 35,
				EPROTONOSUPPORT: 66,
				ESOCKTNOSUPPORT: 137,
				EADDRNOTAVAIL: 4,
				ENETRESET: 39,
				EISCONN: 30,
				ENOTCONN: 53,
				ETOOMANYREFS: 141,
				EUSERS: 136,
				EDQUOT: 19,
				ESTALE: 72,
				ENOTSUP: 138,
				ENOMEDIUM: 148,
				EILSEQ: 25,
				EOVERFLOW: 61,
				ECANCELED: 11,
				ENOTRECOVERABLE: 56,
				EOWNERDEAD: 62,
				ESTRPIPE: 135,
			});
		var se,
			ue = {
				t: function (t, e, r, n) {
					v(
						'Assertion failed: ' +
							g(t) +
							', at: ' +
							[e ? g(e) : 'unknown filename', r, n ? g(n) : 'unknown function'],
					);
				},
				re: function (t, e) {
					C(t)(e);
				},
				o: function (t) {
					return le(t + 24) + 24;
				},
				u: function (t) {
					return (
						(t = new Pt(t)).get_caught() || (t.set_caught(!0), jt--),
						t.set_rethrown(!1),
						Ft.push(t),
						t.add_ref(),
						t.get_exception_ptr()
					);
				},
				Ne: function (t) {
					throw (
						(f('Unexpected exception thrown, this is not properly supported - aborting'),
						(it = !0),
						t)
					);
				},
				y: function () {
					j(0);
					var t,
						e = Ft.pop();
					(e = e).release_ref() &&
						!e.get_rethrown() &&
						((t = e.get_destructor()) && C(t)(e.excPtr), Rt(e.excPtr)),
						(b = 0);
				},
				b: function () {
					var t = b;
					if (!t) return s(0), 0;
					var e = new Pt(t),
						r = (e.set_adjusted_ptr(t), e.get_type());
					if (!r) return s(0), t;
					for (var n = Array.prototype.slice.call(arguments), a = 0; a < n.length; a++) {
						var i = n[a];
						if (0 === i || i === r) break;
						var o = e.ptr + 16;
						if (me(i, r, o)) return s(i), t;
					}
					return s(r), t;
				},
				j: function () {
					var t = b;
					if (!t) return s(0), 0;
					var e = new Pt(t),
						r = (e.set_adjusted_ptr(t), e.get_type());
					if (!r) return s(0), t;
					for (var n = Array.prototype.slice.call(arguments), a = 0; a < n.length; a++) {
						var i = n[a];
						if (0 === i || i === r) break;
						var o = e.ptr + 16;
						if (me(i, r, o)) return s(i), t;
					}
					return s(r), t;
				},
				C: function () {
					var t = b;
					if (!t) return s(0), 0;
					var e = new Pt(t),
						r = (e.set_adjusted_ptr(t), e.get_type());
					if (!r) return s(0), t;
					for (var n = Array.prototype.slice.call(arguments), a = 0; a < n.length; a++) {
						var i = n[a];
						if (0 === i || i === r) break;
						var o = e.ptr + 16;
						if (me(i, r, o)) return s(i), t;
					}
					return s(r), t;
				},
				p: Rt,
				wb: function () {
					var t = Ft.pop(),
						e = (t || v('no exception to throw'), t.excPtr);
					throw (
						(t.get_rethrown() || (Ft.push(t), t.set_rethrown(!0), t.set_caught(!1), jt++), (b = e))
					);
				},
				J: function (t, e, r) {
					throw (new Pt(t).init(e, r), jt++, (b = t));
				},
				uc: function () {
					return jt;
				},
				f: function (t) {
					throw ((b = b || t), t);
				},
				dc: function (t, e) {
					try {
						return (t = G.getStr(t)), S.chmod(t, e), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				lc: function (t, e, r, n) {
					try {
						if (((e = G.getStr(e)), (e = G.calculateAt(t, e)), -8 & r)) return -28;
						var a = S.lookupPath(e, { follow: !0 }).node;
						if (!a) return -44;
						var i = '';
						return (
							4 & r && (i += 'r'),
							2 & r && (i += 'w'),
							1 & r && (i += 'x'),
							i && S.nodePermissions(a, i) ? -2 : 0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				Fd: function (t, e, r, n, a, i) {
					try {
						var o = Bt(r, n);
						if (isNaN(o)) return -61;
						var s = Bt(a, i);
						if (isNaN(s)) return -61;
						var u = G.getStreamFromFD(t);
						return S.allocate(u, o, s), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				ec: function (t, e) {
					try {
						return S.fchmod(t, e), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				cc: function (t, e, r) {
					try {
						return S.fchown(t, e, r), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				wa: function (t, e, r) {
					G.varargs = r;
					try {
						var n = G.getStreamFromFD(t);
						switch (e) {
							case 0:
								return (a = G.get()) < 0 ? -28 : S.createStream(n, a).fd;
							case 1:
							case 2:
								return 0;
							case 3:
								return n.flags;
							case 4:
								var a = G.get();
								return (n.flags |= a), 0;
							case 5:
								a = G.get();
								return (ut[(a + 0) >> 1] = 2), 0;
							case 6:
							case 7:
								return 0;
							case 16:
							case 8:
								return -28;
							case 9:
								return (i = 28), (_[ce() >> 2] = i), -1;
							default:
								return -28;
						}
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
					var i;
				},
				jc: function (t) {
					try {
						G.getStreamFromFD(t);
						return 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				ve: function (t, e) {
					try {
						var r = G.getStreamFromFD(t);
						return G.doStat(S.stat, r.path, e);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				Pd: function (t, e, r) {
					try {
						var n = Bt(e, r);
						return isNaN(n) ? -61 : (S.ftruncate(t, n), 0);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				vc: function (t, e) {
					try {
						if (0 === e) return -28;
						var r = S.cwd(),
							n = ht(r) + 1;
						return e < n ? -68 : (mt(r, t, e), n);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				pc: function (t, e, r) {
					try {
						for (
							var n = G.getStreamFromFD(t),
								a = (n.getdents || (n.getdents = S.readdir(n.path)), 0),
								i = S.llseek(n, 0, 1),
								o = Math.floor(i / 280);
							o < n.getdents.length && a + 280 <= r;

						) {
							var s,
								u,
								c,
								l = n.getdents[o];
							(u =
								'.' === l
									? ((s = n.node.id), 4)
									: '..' === l
									? ((s = S.lookupPath(n.path, { parent: !0 }).node.id), 4)
									: ((s = (c = S.lookupNode(n.node, l)).id),
									  S.isChrdev(c.mode) ? 2 : S.isDir(c.mode) ? 4 : S.isLink(c.mode) ? 10 : 8)),
								(w = [
									s >>> 0,
									((E = s),
									1 <= +Math.abs(E)
										? 0 < E
											? (0 | Math.min(+Math.floor(E / 4294967296), 4294967295)) >>> 0
											: ~~+Math.ceil((E - (~~E >>> 0)) / 4294967296) >>> 0
										: 0),
								]),
								(_[(e + a) >> 2] = w[0]),
								(_[(e + a + 4) >> 2] = w[1]),
								(w = [
									(280 * (o + 1)) >>> 0,
									((E = 280 * (o + 1)),
									1 <= +Math.abs(E)
										? 0 < E
											? (0 | Math.min(+Math.floor(E / 4294967296), 4294967295)) >>> 0
											: ~~+Math.ceil((E - (~~E >>> 0)) / 4294967296) >>> 0
										: 0),
								]),
								(_[(e + a + 8) >> 2] = w[0]),
								(_[(e + a + 12) >> 2] = w[1]),
								(ut[(e + a + 16) >> 1] = 280),
								(d[(e + a + 18) >> 0] = u),
								mt(l, e + a + 19, 256),
								(a += 280),
								(o += 1);
						}
						return S.llseek(n, 280 * o, 0), a;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				Ce: function (t, e, r) {
					G.varargs = r;
					try {
						var n = G.getStreamFromFD(t);
						switch (e) {
							case 21509:
							case 21505:
								return n.tty ? 0 : -59;
							case 21510:
							case 21511:
							case 21512:
							case 21506:
							case 21507:
							case 21508:
								return n.tty ? 0 : -59;
							case 21519:
								if (!n.tty) return -59;
								var a = G.get();
								return (_[a >> 2] = 0);
							case 21520:
								return n.tty ? -28 : -59;
							case 21531:
								a = G.get();
								return S.ioctl(n, e, a);
							case 21523:
							case 21524:
								return n.tty ? 0 : -59;
							default:
								v('bad ioctl syscall ' + e);
						}
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				be: function (t, e) {
					try {
						return (t = G.getStr(t)), G.doStat(S.lstat, t, e);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				rc: function (t, e, r) {
					try {
						return (
							(e = G.getStr(e)),
							(e = G.calculateAt(t, e)),
							'/' === (e = D.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)),
							S.mkdir(e, r, 0),
							0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				je: function (t, e, r, n) {
					try {
						e = G.getStr(e);
						var a = 256 & n,
							i = 4096 & n;
						return (n &= -4353), (e = G.calculateAt(t, e, i)), G.doStat(a ? S.lstat : S.stat, e, r);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				Tb: function (t, e, r, n) {
					G.varargs = n;
					try {
						(e = G.getStr(e)), (e = G.calculateAt(t, e));
						var a = n ? G.get() : 0;
						return S.open(e, r, a).fd;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				Ie: function (t) {
					try {
						if (0 == t) throw new S.ErrnoError(21);
						var e = N.createPipe();
						return (_[t >> 2] = e.readable_fd), (_[(t + 4) >> 2] = e.writable_fd), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				$b: function (t, e, r, n) {
					try {
						if (((e = G.getStr(e)), (e = G.calculateAt(t, e)), n <= 0)) return -28;
						var a = S.readlink(e),
							i = Math.min(n, ht(a)),
							o = d[r + i];
						return mt(a, r, n + 1), (d[r + i] = o), i;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				sc: function (t, e, r, n) {
					try {
						return (
							(e = G.getStr(e)),
							(n = G.getStr(n)),
							(e = G.calculateAt(t, e)),
							(n = G.calculateAt(r, n)),
							S.rename(e, n),
							0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				qc: function (t) {
					try {
						return (t = G.getStr(t)), S.rmdir(t), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				pe: function (t, e) {
					try {
						return (t = G.getStr(t)), G.doStat(S.stat, t, e);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				oc: function (t, e, r) {
					try {
						return (
							(t = G.getStr(t)),
							(_[(r + 4) >> 2] = 4096),
							(_[(r + 40) >> 2] = 4096),
							(_[(r + 8) >> 2] = 1e6),
							(_[(r + 12) >> 2] = 5e5),
							(_[(r + 16) >> 2] = 5e5),
							(_[(r + 20) >> 2] = S.nextInode),
							(_[(r + 24) >> 2] = 1e6),
							(_[(r + 28) >> 2] = 42),
							(_[(r + 44) >> 2] = 2),
							(_[(r + 36) >> 2] = 255),
							0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				tc: function (t, e, r) {
					try {
						return (
							(e = G.getStr(e)),
							(e = G.calculateAt(t, e)),
							0 === r
								? S.unlink(e)
								: 512 === r
								? S.rmdir(e)
								: v('Invalid flags passed to unlinkat'),
							0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				fc: function (t, e, r, n) {
					try {
						var a, i;
						return (
							(e = G.getStr(e)),
							(e = G.calculateAt(t, e, !0)),
							(i = r
								? ((a = 1e3 * _[r >> 2] + _[(r + 8) >> 2] / 1e6),
								  1e3 * _[(r += 16) >> 2] + _[(r + 8) >> 2] / 1e6)
								: (a = Date.now())),
							S.utime(e, a, i),
							0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				gc: function (t) {},
				ic: function (t, e) {
					v(Ut);
				},
				hc: function (t, e) {
					v(Ut);
				},
				Sa: function () {
					return Date.now();
				},
				Oe: function () {
					throw 1 / 0;
				},
				Gd: function (t, e) {
					var t = new Date(1e3 * _[t >> 2]),
						r =
							((_[e >> 2] = t.getSeconds()),
							(_[(e + 4) >> 2] = t.getMinutes()),
							(_[(e + 8) >> 2] = t.getHours()),
							(_[(e + 12) >> 2] = t.getDate()),
							(_[(e + 16) >> 2] = t.getMonth()),
							(_[(e + 20) >> 2] = t.getFullYear() - 1900),
							(_[(e + 24) >> 2] = t.getDay()),
							new Date(t.getFullYear(), 0, 1)),
						n = ((t.getTime() - r.getTime()) / 864e5) | 0,
						n =
							((_[(e + 28) >> 2] = n),
							(_[(e + 36) >> 2] = -60 * t.getTimezoneOffset()),
							new Date(t.getFullYear(), 6, 1).getTimezoneOffset()),
						r = r.getTimezoneOffset(),
						t = 0 | (n != r && t.getTimezoneOffset() == Math.min(r, n));
					_[(e + 32) >> 2] = t;
				},
				Rd: function (t) {
					var e = new Date(
							_[(t + 20) >> 2] + 1900,
							_[(t + 16) >> 2],
							_[(t + 12) >> 2],
							_[(t + 8) >> 2],
							_[(t + 4) >> 2],
							_[t >> 2],
							0,
						),
						r = _[(t + 32) >> 2],
						n = e.getTimezoneOffset(),
						a = new Date(e.getFullYear(), 0, 1),
						i = new Date(e.getFullYear(), 6, 1).getTimezoneOffset(),
						o = a.getTimezoneOffset(),
						s = Math.min(o, i),
						r =
							(r < 0
								? (_[(t + 32) >> 2] = Number(i != o && s == n))
								: 0 < r != (s == n) &&
								  ((o = Math.max(o, i)),
								  (i = 0 < r ? s : o),
								  e.setTime(e.getTime() + 6e4 * (i - n))),
							(_[(t + 24) >> 2] = e.getDay()),
							((e.getTime() - a.getTime()) / 864e5) | 0);
					return (
						(_[(t + 28) >> 2] = r),
						(_[t >> 2] = e.getSeconds()),
						(_[(t + 4) >> 2] = e.getMinutes()),
						(_[(t + 8) >> 2] = e.getHours()),
						(_[(t + 12) >> 2] = e.getDate()),
						(_[(t + 16) >> 2] = e.getMonth()),
						(e.getTime() / 1e3) | 0
					);
				},
				ac: function (t, e, r, n, a, i) {
					try {
						var o = S.getStream(n);
						if (!o) return -8;
						var s = S.mmap(o, t, a, e, r),
							u = s.ptr;
						return (_[i >> 2] = s.allocated), u;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				bc: function (t, e, r, n, a, i) {
					try {
						var o = S.getStream(a);
						o && (2 & r && G.doMsync(t, o, e, n, i), S.munmap(o));
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return -t.errno;
						throw t;
					}
				},
				Zd: zt,
				Z: function () {
					v('');
				},
				Ke: Wt,
				vb: Yt,
				Pe: function (t, e, r) {
					p.copyWithin(t, e, e + r);
				},
				Qe: function (t) {
					var e = p.length,
						r = Wt();
					if (r < (t >>>= 0)) return !1;
					for (var n, a = 1; a <= 4; a *= 2) {
						var i = e * (1 + 0.2 / a),
							i = Math.min(i, t + 100663296);
						if (
							(function (t) {
								try {
									return et.grow((t - st.byteLength + 65535) >>> 16), yt(et.buffer), 1;
								} catch (t) {}
							})(Math.min(r, (i = Math.max(t, i)) + (((n = 65536) - (i % n)) % n)))
						)
							return !0;
					}
					return !1;
				},
				mc: function (o, s) {
					var u = 0;
					return (
						Ht().forEach(function (t, e) {
							for (
								var r = s + u, n = ((m[(o + 4 * e) >> 2] = r), t), a = r, e = void 0, i = 0;
								i < n.length;
								++i
							)
								d[a++ >> 0] = n.charCodeAt(i);
							e || (d[a >> 0] = 0), (u += t.length + 1);
						}),
						0
					);
				},
				nc: function (t, e) {
					var r = Ht(),
						n = ((m[t >> 2] = r.length), 0);
					return (
						r.forEach(function (t) {
							n += t.length + 1;
						}),
						(m[e >> 2] = n),
						0
					);
				},
				Ba: Xt,
				Ma: function (t) {
					try {
						var e = G.getStreamFromFD(t);
						return S.close(e), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return t.errno;
						throw t;
					}
				},
				xb: function (t, e) {
					try {
						var r = G.getStreamFromFD(t),
							n = r.tty ? 2 : S.isDir(r.mode) ? 3 : S.isLink(r.mode) ? 7 : 4;
						return (d[e >> 0] = n), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return t.errno;
						throw t;
					}
				},
				Qb: function (t, e, r, n) {
					try {
						var a = (function (t, e, r, n) {
							for (var a = 0, i = 0; i < r; i++) {
								var o = m[e >> 2],
									s = m[(e + 4) >> 2],
									o = ((e += 8), S.read(t, d, o, s, n));
								if (o < 0) return -1;
								if (((a += o), o < s)) break;
							}
							return a;
						})(G.getStreamFromFD(t), e, r);
						return (_[n >> 2] = a), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return t.errno;
						throw t;
					}
				},
				Vd: function (t, e, r, n, a) {
					try {
						var i = Bt(e, r);
						if (isNaN(i)) return 61;
						var o = G.getStreamFromFD(t);
						return (
							S.llseek(o, i, n),
							(w = [
								o.position >>> 0,
								((E = o.position),
								1 <= +Math.abs(E)
									? 0 < E
										? (0 | Math.min(+Math.floor(E / 4294967296), 4294967295)) >>> 0
										: ~~+Math.ceil((E - (~~E >>> 0)) / 4294967296) >>> 0
									: 0),
							]),
							(_[a >> 2] = w[0]),
							(_[(a + 4) >> 2] = w[1]),
							o.getdents && 0 === i && 0 === n && (o.getdents = null),
							0
						);
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return t.errno;
						throw t;
					}
				},
				jb: function (t, e, r, n) {
					try {
						var a = (function (t, e, r, n) {
							for (var a = 0, i = 0; i < r; i++) {
								var o = m[e >> 2],
									s = m[(e + 4) >> 2],
									o = ((e += 8), S.write(t, d, o, s, n));
								if (o < 0) return -1;
								a += o;
							}
							return a;
						})(G.getStreamFromFD(t), e, r);
						return (m[n >> 2] = a), 0;
					} catch (t) {
						if (void 0 !== S && t instanceof S.ErrnoError) return t.errno;
						throw t;
					}
				},
				a: function () {
					return nt;
				},
				Me: qt,
				db: function (t, e) {
					var r = P();
					try {
						return C(t)(e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Za: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				pb: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Yd: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				q: function (t, e) {
					var r = P();
					try {
						return C(t)(e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ha: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				z: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				xa: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				E: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				F: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Cb: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ea: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Vb: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ra: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				B: function (t) {
					var e = P();
					try {
						return C(t)();
					} catch (t) {
						if ((R(e), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				na: function (t, e) {
					var r = P();
					try {
						return C(t)(e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ne: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ia: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				La: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Fe: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w, v, b, D, A) {
					var T = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w, v, b, D, A);
					} catch (t) {
						if ((R(T), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ja: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Q: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				$: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				c: function (t, e) {
					var r = P();
					try {
						return C(t)(e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				D: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				T: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				W: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				P: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				V: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				fa: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ra: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ya: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ye: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				qb: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ee: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				$d: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w) {
					var v = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w);
					} catch (t) {
						if ((R(v), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Wb: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ab: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ob: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Aa: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Bb: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				A: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				fe: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				we: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				d: function (t, e, r) {
					var n = P();
					try {
						return C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				H: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				zb: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ga: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Je: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ha: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ge: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ab: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Mb: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Pb: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				sb: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				zc: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return qe(t, e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Rb: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ue: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ta: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Oa: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				X: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				bb: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Nb: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Le: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				e: function (t, e, r, n) {
					var a = P();
					try {
						return C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Y: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				he: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ge: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Sb: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				_a: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h) {
					var y = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h);
					} catch (t) {
						if ((R(y), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ja: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p) {
					var m = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p);
					} catch (t) {
						if ((R(m), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Fb: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Kb: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Lb: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				_d: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Da: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				nb: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				l: function (t, e, r, n, a) {
					var i = P();
					try {
						return C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ya: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Xd: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Gb: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				de: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Jb: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				aa: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ub: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				m: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Na: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				te: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				oe: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _) {
					var g = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _);
					} catch (t) {
						if ((R(g), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				qe: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h) {
					var y = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h);
					} catch (t) {
						if ((R(y), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				He: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ka: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				x: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ie: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				xe: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Be: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ke: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				le: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				I: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ce: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				mb: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				me: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				O: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				De: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				yb: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _) {
					var g = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _);
					} catch (t) {
						if ((R(g), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ib: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				U: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				da: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ca: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p) {
					var m = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p);
					} catch (t) {
						if ((R(m), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ia: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ua: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				pa: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Wd: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p) {
					var m = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p);
					} catch (t) {
						if ((R(m), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Fa: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p) {
					var m = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p);
					} catch (t) {
						if ((R(m), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				fb: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Xa: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h) {
					var y = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h);
					} catch (t) {
						if ((R(y), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ee: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E) {
					var w = P();
					try {
						return C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E);
					} catch (t) {
						if ((R(w), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				xc: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _) {
					var g = P();
					try {
						return Rr(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _);
					} catch (t) {
						if ((R(g), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				hd: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g) {
					var E = P();
					try {
						return tr(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g);
					} catch (t) {
						if ((R(E), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				nd: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E) {
					var w = P();
					try {
						return We(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E);
					} catch (t) {
						if ((R(w), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ud: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h) {
					var y = P();
					try {
						return Ye(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h);
					} catch (t) {
						if ((R(y), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ec: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y) {
					var _ = P();
					try {
						return Gr(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y);
					} catch (t) {
						if ((R(_), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Nc: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return br(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Uc: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						return yr(t, e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Vc: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						return hr(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				rd: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return Xe(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Rc: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return Er(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				pd: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return Ne(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				sd: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return Qe(t, e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Fc: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return Ce(t, e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Jd: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return nr(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Hd: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return Te(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Bd: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return xe(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Mc: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return Dr(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				gd: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return er(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Sc: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return gr(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				cd: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return Oe(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				md: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return je(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				yc: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return Pr(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				qd: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return jr(t, e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Md: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return be(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ld: function (t, e, r, n, a) {
					var i = P();
					try {
						return De(t, e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ld: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return ve(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				kd: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return Je(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Zc: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return dr(t, e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				yd: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						return mr(t, e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ad: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return Ue(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				od: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						return Ve(t, e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Xc: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return pr(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				$c: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						return lr(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Tc: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						return _r(t, e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				id: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return $e(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Nd: function (t, e, r, n) {
					var a = P();
					try {
						return we(t, e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Od: function (t, e, r, n, a) {
					var i = P();
					try {
						return ge(t, e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Oc: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return Ge(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Hc: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						return Lr(t, e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				vd: function (t, e, r) {
					var n = P();
					try {
						return Pe(t, e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				fd: function (t, e, r, n) {
					var a = P();
					try {
						return rr(t, e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Kd: function (t) {
					var e = P();
					try {
						return Ae(t);
					} catch (t) {
						if ((R(e), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Sd: function (t, e) {
					var r = P();
					try {
						return Ee(t, e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Qd: function (t, e, r) {
					var n = P();
					try {
						return _e(t, e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Dd: function (t, e, r, n) {
					var a = P();
					try {
						return Me(t, e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ic: function (t, e, r, n, a) {
					var i = P();
					try {
						return Sr(t, e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ud: function (t, e, r, n, a) {
					var i = P();
					try {
						return ye(t, e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				jd: function (
					t,
					e,
					r,
					n,
					a,
					i,
					o,
					s,
					u,
					c,
					l,
					f,
					d,
					p,
					m,
					h,
					y,
					_,
					g,
					E,
					w,
					v,
					b,
					D,
					A,
					T,
				) {
					var C = P();
					try {
						return Ze(t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w, v, b, D, A, T);
					} catch (t) {
						if ((R(C), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				_c: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return ar(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Yc: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						return ir(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Gc: function (t, e, r, n) {
					var a = P();
					try {
						return Ke(t, e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Lc: function (t, e, r, n, a, i) {
					var o = P();
					try {
						return Cr(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Cc: function (t, e, r, n) {
					var a = P();
					try {
						return Nr(t, e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				n: function (t) {
					var e = P();
					try {
						C(t)();
					} catch (t) {
						if ((R(e), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				la: function (t, e) {
					var r = P();
					try {
						C(t)(e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ae: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Db: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				h: function (t, e) {
					var r = P();
					try {
						C(t)(e);
					} catch (t) {
						if ((R(r), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				_: function (t, e, r) {
					var n = P();
					try {
						C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				M: function (t, e, r, n) {
					var a = P();
					try {
						C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ca: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ma: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ib: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				se: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				rb: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				kb: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				va: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				R: function (t, e, r, n) {
					var a = P();
					try {
						C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				lb: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ba: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Eb: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				i: function (t, e, r) {
					var n = P();
					try {
						C(t)(e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				G: function (t, e, r, n) {
					var a = P();
					try {
						C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				K: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ka: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Va: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Wa: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				eb: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				L: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Qa: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				g: function (t, e, r, n) {
					var a = P();
					try {
						C(t)(e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				sa: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				cb: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				wc: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				k: function (t, e, r, n, a) {
					var i = P();
					try {
						C(t)(e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Pa: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ua: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				$a: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Zb: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				hb: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Yb: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ta: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ob: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				s: function (t, e, r, n, a, i) {
					var o = P();
					try {
						C(t)(e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				_b: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w, v) {
					var b = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y, _, g, E, w, v);
					} catch (t) {
						if ((R(b), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ub: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p) {
					var m = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p);
					} catch (t) {
						if ((R(m), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				tb: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Hb: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				v: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						C(t)(e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				N: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						C(t)(e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ea: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						C(t)(e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ze: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				S: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				za: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y) {
					var _ = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h, y);
					} catch (t) {
						if ((R(_), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				oa: function (t, e, r, n, a, i, o, s, u, c, l) {
					var f = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l);
					} catch (t) {
						if ((R(f), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ae: function (t, e, r, n, a, i, o, s, u, c, l, f) {
					var d = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f);
					} catch (t) {
						if ((R(d), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Xb: function (t, e, r, n, a, i, o, s, u, c, l, f, d) {
					var p = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d);
					} catch (t) {
						if ((R(p), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				gb: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m) {
					var h = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m);
					} catch (t) {
						if ((R(h), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ga: function (t, e, r, n, a, i, o, s, u, c, l, f, d, p, m, h) {
					var y = P();
					try {
						C(t)(e, r, n, a, i, o, s, u, c, l, f, d, p, m, h);
					} catch (t) {
						if ((R(y), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				td: function (t, e, r, n, a, i, o, s, u) {
					var c = P();
					try {
						He(t, e, r, n, a, i, o, s, u);
					} catch (t) {
						if ((R(c), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Cd: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						Ie(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ac: function (t, e, r, n, a, i) {
					var o = P();
					try {
						Fr(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				zd: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						Be(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ad: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						fr(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				wd: function (t, e, r, n, a) {
					var i = P();
					try {
						ke(t, e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Dc: function (t, e, r, n, a, i) {
					var o = P();
					try {
						Re(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Id: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						Le(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Td: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						or(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Kc: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						Tr(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Wc: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						ur(t, e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Ed: function (t, e, r, n) {
					var a = P();
					try {
						Fe(t, e, r, n);
					} catch (t) {
						if ((R(a), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Bc: function (t, e, r, n, a) {
					var i = P();
					try {
						Ar(t, e, r, n, a);
					} catch (t) {
						if ((R(i), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Pc: function (t, e, r, n, a, i) {
					var o = P();
					try {
						vr(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				ed: function (t, e, r, n, a, i) {
					var o = P();
					try {
						Se(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Jc: function (t, e, r, n, a, i, o, s, u, c) {
					var l = P();
					try {
						Or(t, e, r, n, a, i, o, s, u, c);
					} catch (t) {
						if ((R(l), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				Qc: function (t, e, r, n, a, i, o) {
					var s = P();
					try {
						wr(t, e, r, n, a, i, o);
					} catch (t) {
						if ((R(s), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				bd: function (t, e, r, n, a, i) {
					var o = P();
					try {
						cr(t, e, r, n, a, i);
					} catch (t) {
						if ((R(o), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				dd: function (t, e, r, n, a, i, o, s) {
					var u = P();
					try {
						sr(t, e, r, n, a, i, o, s);
					} catch (t) {
						if ((R(u), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				xd: function (t, e, r) {
					var n = P();
					try {
						ze(t, e, r);
					} catch (t) {
						if ((R(n), t !== t + 0)) throw t;
						j(1, 0);
					}
				},
				w: function (t) {
					return t;
				},
				r: function (t) {
					s(t);
				},
				qa: $t,
				kc: $t,
			},
			ce =
				(!(function () {
					var e = { a: ue };
					function r(t, e) {
						var t = t.exports;
						(c.asm = t),
							yt((et = c.asm.Re).buffer),
							(h = c.asm.Eg),
							(t = c.asm.Se),
							gt.unshift(t),
							At();
					}
					function n(t) {
						r(t.instance);
					}
					function a(t) {
						return (function () {
							if (!tt && ($ || l)) {
								if ('function' == typeof fetch && !Ct(y))
									return fetch(y, { credentials: 'same-origin' })
										.then(function (t) {
											if (t.ok) return t.arrayBuffer();
											throw "failed to load wasm binary file at '" + y + "'";
										})
										.catch(function () {
											return Lt(y);
										});
								if (X)
									return new Promise(function (e, t) {
										X(
											y,
											function (t) {
												e(new Uint8Array(t));
											},
											t,
										);
									});
							}
							return Promise.resolve().then(function () {
								return Lt(y);
							});
						})()
							.then(function (t) {
								return WebAssembly.instantiate(t, e);
							})
							.then(function (t) {
								return t;
							})
							.then(t, function (t) {
								f('failed to asynchronously prepare wasm: ' + t), v(t);
							});
					}
					if ((Dt(), c.instantiateWasm))
						try {
							c.instantiateWasm(e, r);
							return;
						} catch (t) {
							return f('Module.instantiateWasm callback failed with error: ' + t);
						}
					(tt ||
					'function' != typeof WebAssembly.instantiateStreaming ||
					Tt(y) ||
					Ct(y) ||
					o ||
					'function' != typeof fetch
						? a(n)
						: fetch(y, { credentials: 'same-origin' }).then(function (t) {
								return WebAssembly.instantiateStreaming(t, e).then(n, function (t) {
									return (
										f('wasm streaming compile failed: ' + t),
										f('falling back to ArrayBuffer instantiation'),
										a(n)
									);
								});
						  })
					).catch(I);
				})(),
				(c.___wasm_call_ctors = function () {
					return (c.___wasm_call_ctors = c.asm.Se).apply(null, arguments);
				}),
				(c._CPLSetConfigOption = function () {
					return (c._CPLSetConfigOption = c.asm.Te).apply(null, arguments);
				}),
				(c._CPLSetThreadLocalConfigOption = function () {
					return (c._CPLSetThreadLocalConfigOption = c.asm.Ue).apply(null, arguments);
				}),
				(c._CPLError = function () {
					return (c._CPLError = c.asm.Ve).apply(null, arguments);
				}),
				(c._CPLErrorReset = function () {
					return (c._CPLErrorReset = c.asm.We).apply(null, arguments);
				}),
				(c._CPLGetLastErrorNo = function () {
					return (c._CPLGetLastErrorNo = c.asm.Xe).apply(null, arguments);
				}),
				(c._CPLGetLastErrorType = function () {
					return (c._CPLGetLastErrorType = c.asm.Ye).apply(null, arguments);
				}),
				(c._CPLGetLastErrorMsg = function () {
					return (c._CPLGetLastErrorMsg = c.asm.Ze).apply(null, arguments);
				}),
				(c._CPLQuietErrorHandler = function () {
					return (c._CPLQuietErrorHandler = c.asm._e).apply(null, arguments);
				}),
				(c._CPLSetErrorHandler = function () {
					return (c._CPLSetErrorHandler = c.asm.$e).apply(null, arguments);
				}),
				(c._CSLCount = function () {
					return (c._CSLCount = c.asm.af).apply(null, arguments);
				}),
				(c._GDALSuggestedWarpOutput = function () {
					return (c._GDALSuggestedWarpOutput = c.asm.bf).apply(null, arguments);
				}),
				(c._GDALGenImgProjTransform = function () {
					return (c._GDALGenImgProjTransform = c.asm.cf).apply(null, arguments);
				}),
				(c._GDALCreateGenImgProjTransformer = function () {
					return (c._GDALCreateGenImgProjTransformer = c.asm.df).apply(null, arguments);
				}),
				(c._GDALCreateGenImgProjTransformer2 = function () {
					return (c._GDALCreateGenImgProjTransformer2 = c.asm.ef).apply(null, arguments);
				}),
				(c._GDALDestroyGenImgProjTransformer = function () {
					return (c._GDALDestroyGenImgProjTransformer = c.asm.ff).apply(null, arguments);
				}),
				(c._GDALReprojectImage = function () {
					return (c._GDALReprojectImage = c.asm.gf).apply(null, arguments);
				}),
				(c._OSRNewSpatialReference = function () {
					return (c._OSRNewSpatialReference = c.asm.hf).apply(null, arguments);
				}),
				(c._OSRDestroySpatialReference = function () {
					return (c._OSRDestroySpatialReference = c.asm.jf).apply(null, arguments);
				}),
				(c._OSRSetFromUserInput = function () {
					return (c._OSRSetFromUserInput = c.asm.kf).apply(null, arguments);
				}),
				(c._OSRImportFromEPSG = function () {
					return (c._OSRImportFromEPSG = c.asm.lf).apply(null, arguments);
				}),
				(c._OCTDestroyCoordinateTransformation = function () {
					return (c._OCTDestroyCoordinateTransformation = c.asm.mf).apply(null, arguments);
				}),
				(c._OCTNewCoordinateTransformation = function () {
					return (c._OCTNewCoordinateTransformation = c.asm.nf).apply(null, arguments);
				}),
				(c._OCTTransform = function () {
					return (c._OCTTransform = c.asm.of).apply(null, arguments);
				}),
				(c._GDALAllRegister = function () {
					return (c._GDALAllRegister = c.asm.pf).apply(null, arguments);
				}),
				(c._OGRGetDriverCount = function () {
					return (c._OGRGetDriverCount = c.asm.qf).apply(null, arguments);
				}),
				(c._OGRGetDriver = function () {
					return (c._OGRGetDriver = c.asm.rf).apply(null, arguments);
				}),
				(c._OGR_L_GetFeatureCount = function () {
					return (c._OGR_L_GetFeatureCount = c.asm.sf).apply(null, arguments);
				}),
				(c._OGR_L_GetName = function () {
					return (c._OGR_L_GetName = c.asm.tf).apply(null, arguments);
				}),
				(c._OGR_DS_GetLayerCount = function () {
					return (c._OGR_DS_GetLayerCount = c.asm.uf).apply(null, arguments);
				}),
				(c._OGR_DS_GetLayer = function () {
					return (c._OGR_DS_GetLayer = c.asm.vf).apply(null, arguments);
				}),
				(c._OGR_DS_GetName = function () {
					return (c._OGR_DS_GetName = c.asm.wf).apply(null, arguments);
				}),
				(c._OGR_DS_GetDriver = function () {
					return (c._OGR_DS_GetDriver = c.asm.xf).apply(null, arguments);
				}),
				(c._OGR_Dr_GetName = function () {
					return (c._OGR_Dr_GetName = c.asm.yf).apply(null, arguments);
				}),
				(c._GDALCreate = function () {
					return (c._GDALCreate = c.asm.zf).apply(null, arguments);
				}),
				(c._GDALCreateCopy = function () {
					return (c._GDALCreateCopy = c.asm.Af).apply(null, arguments);
				}),
				(c._GDALGetDriverShortName = function () {
					return (c._GDALGetDriverShortName = c.asm.Bf).apply(null, arguments);
				}),
				(c._GDALGetDriverLongName = function () {
					return (c._GDALGetDriverLongName = c.asm.Cf).apply(null, arguments);
				}),
				(c._GDALGetDriverCount = function () {
					return (c._GDALGetDriverCount = c.asm.Df).apply(null, arguments);
				}),
				(c._GDALGetDriver = function () {
					return (c._GDALGetDriver = c.asm.Ef).apply(null, arguments);
				}),
				(c._GDALGetDriverByName = function () {
					return (c._GDALGetDriverByName = c.asm.Ff).apply(null, arguments);
				}),
				(c._GDALGetRasterXSize = function () {
					return (c._GDALGetRasterXSize = c.asm.Gf).apply(null, arguments);
				}),
				(c._GDALGetRasterYSize = function () {
					return (c._GDALGetRasterYSize = c.asm.Hf).apply(null, arguments);
				}),
				(c._GDALGetRasterBand = function () {
					return (c._GDALGetRasterBand = c.asm.If).apply(null, arguments);
				}),
				(c._GDALGetRasterCount = function () {
					return (c._GDALGetRasterCount = c.asm.Jf).apply(null, arguments);
				}),
				(c._GDALGetProjectionRef = function () {
					return (c._GDALGetProjectionRef = c.asm.Kf).apply(null, arguments);
				}),
				(c._GDALSetProjection = function () {
					return (c._GDALSetProjection = c.asm.Lf).apply(null, arguments);
				}),
				(c._GDALGetGeoTransform = function () {
					return (c._GDALGetGeoTransform = c.asm.Mf).apply(null, arguments);
				}),
				(c._GDALSetGeoTransform = function () {
					return (c._GDALSetGeoTransform = c.asm.Nf).apply(null, arguments);
				}),
				(c._GDALGetDatasetDriver = function () {
					return (c._GDALGetDatasetDriver = c.asm.Of).apply(null, arguments);
				}),
				(c._GDALGetFileList = function () {
					return (c._GDALGetFileList = c.asm.Pf).apply(null, arguments);
				}),
				(c._GDALOpen = function () {
					return (c._GDALOpen = c.asm.Qf).apply(null, arguments);
				}),
				(c._GDALOpenEx = function () {
					return (c._GDALOpenEx = c.asm.Rf).apply(null, arguments);
				}),
				(c._GDALClose = function () {
					return (c._GDALClose = c.asm.Sf).apply(null, arguments);
				}),
				(c._GDALDatasetGetLayerCount = function () {
					return (c._GDALDatasetGetLayerCount = c.asm.Tf).apply(null, arguments);
				}),
				(c._GDALDatasetGetLayer = function () {
					return (c._GDALDatasetGetLayer = c.asm.Uf).apply(null, arguments);
				}),
				(c._GDALGetRasterDataType = function () {
					return (c._GDALGetRasterDataType = c.asm.Vf).apply(null, arguments);
				}),
				(c._GDALGetRasterNoDataValue = function () {
					return (c._GDALGetRasterNoDataValue = c.asm.Wf).apply(null, arguments);
				}),
				(c._GDALGetRasterMaximum = function () {
					return (c._GDALGetRasterMaximum = c.asm.Xf).apply(null, arguments);
				}),
				(c._GDALGetRasterMinimum = function () {
					return (c._GDALGetRasterMinimum = c.asm.Yf).apply(null, arguments);
				}),
				(c._GDALGetRasterStatistics = function () {
					return (c._GDALGetRasterStatistics = c.asm.Zf).apply(null, arguments);
				}),
				(c._GDALSetCacheMax = function () {
					return (c._GDALSetCacheMax = c.asm._f).apply(null, arguments);
				}),
				(c._GDALGetDescription = function () {
					return (c._GDALGetDescription = c.asm.$f).apply(null, arguments);
				}),
				(c._GDALGetMetadataItem = function () {
					return (c._GDALGetMetadataItem = c.asm.ag).apply(null, arguments);
				}),
				(c._GDALBuildVRT = function () {
					return (c._GDALBuildVRT = c.asm.bg).apply(null, arguments);
				}),
				(c._GDALBuildVRTOptionsFree = function () {
					return (c._GDALBuildVRTOptionsFree = c.asm.cg).apply(null, arguments);
				}),
				(c._GDALBuildVRTOptionsNew = function () {
					return (c._GDALBuildVRTOptionsNew = c.asm.dg).apply(null, arguments);
				}),
				(c._GDALTranslate = function () {
					return (c._GDALTranslate = c.asm.eg).apply(null, arguments);
				}),
				(c._GDALTranslateOptionsNew = function () {
					return (c._GDALTranslateOptionsNew = c.asm.fg).apply(null, arguments);
				}),
				(c._GDALTranslateOptionsFree = function () {
					return (c._GDALTranslateOptionsFree = c.asm.gg).apply(null, arguments);
				}),
				(c._GDALRasterize = function () {
					return (c._GDALRasterize = c.asm.hg).apply(null, arguments);
				}),
				(c._GDALRasterizeOptionsNew = function () {
					return (c._GDALRasterizeOptionsNew = c.asm.ig).apply(null, arguments);
				}),
				(c._GDALRasterizeOptionsFree = function () {
					return (c._GDALRasterizeOptionsFree = c.asm.jg).apply(null, arguments);
				}),
				(c._GDALWarp = function () {
					return (c._GDALWarp = c.asm.kg).apply(null, arguments);
				}),
				(c._GDALWarpAppOptionsNew = function () {
					return (c._GDALWarpAppOptionsNew = c.asm.lg).apply(null, arguments);
				}),
				(c._GDALWarpAppOptionsFree = function () {
					return (c._GDALWarpAppOptionsFree = c.asm.mg).apply(null, arguments);
				}),
				(c._GDALWarpAppOptionsSetProgress = function () {
					return (c._GDALWarpAppOptionsSetProgress = c.asm.ng).apply(null, arguments);
				}),
				(c._GDALVectorTranslate = function () {
					return (c._GDALVectorTranslate = c.asm.og).apply(null, arguments);
				}),
				(c._GDALVectorTranslateOptionsFree = function () {
					return (c._GDALVectorTranslateOptionsFree = c.asm.pg).apply(null, arguments);
				}),
				(c._GDALVectorTranslateOptionsNew = function () {
					return (c._GDALVectorTranslateOptionsNew = c.asm.qg).apply(null, arguments);
				}),
				(c._GDALDEMProcessing = function () {
					return (c._GDALDEMProcessing = c.asm.rg).apply(null, arguments);
				}),
				(c._GDALDEMProcessingOptionsNew = function () {
					return (c._GDALDEMProcessingOptionsNew = c.asm.sg).apply(null, arguments);
				}),
				(c._GDALDEMProcessingOptionsFree = function () {
					return (c._GDALDEMProcessingOptionsFree = c.asm.tg).apply(null, arguments);
				}),
				(c.___errno_location = function () {
					return (ce = c.___errno_location = c.asm.ug).apply(null, arguments);
				})),
			le = (c._malloc = function () {
				return (le = c._malloc = c.asm.vg).apply(null, arguments);
			}),
			fe = (c._free = function () {
				return (fe = c._free = c.asm.wg).apply(null, arguments);
			}),
			de = (c._emscripten_builtin_memalign = function () {
				return (de = c._emscripten_builtin_memalign = c.asm.xg).apply(null, arguments);
			}),
			j = (c._setThrew = function () {
				return (j = c._setThrew = c.asm.yg).apply(null, arguments);
			}),
			P = (c.stackSave = function () {
				return (P = c.stackSave = c.asm.zg).apply(null, arguments);
			}),
			R = (c.stackRestore = function () {
				return (R = c.stackRestore = c.asm.Ag).apply(null, arguments);
			}),
			pe = (c.stackAlloc = function () {
				return (pe = c.stackAlloc = c.asm.Bg).apply(null, arguments);
			}),
			me = (c.___cxa_can_catch = function () {
				return (me = c.___cxa_can_catch = c.asm.Cg).apply(null, arguments);
			}),
			he = (c.___cxa_is_pointer_type = function () {
				return (he = c.___cxa_is_pointer_type = c.asm.Dg).apply(null, arguments);
			}),
			ye = (c.dynCall_jiiii = function () {
				return (ye = c.dynCall_jiiii = c.asm.Fg).apply(null, arguments);
			}),
			_e = (c.dynCall_jii = function () {
				return (_e = c.dynCall_jii = c.asm.Gg).apply(null, arguments);
			}),
			ge = (c.dynCall_iiji = function () {
				return (ge = c.dynCall_iiji = c.asm.Hg).apply(null, arguments);
			}),
			Ee = (c.dynCall_ji = function () {
				return (Ee = c.dynCall_ji = c.asm.Ig).apply(null, arguments);
			}),
			we = (c.dynCall_iij = function () {
				return (we = c.dynCall_iij = c.asm.Jg).apply(null, arguments);
			}),
			ve = (c.dynCall_iiiji = function () {
				return (ve = c.dynCall_iiiji = c.asm.Kg).apply(null, arguments);
			}),
			be = (c.dynCall_iiiijjjii = function () {
				return (be = c.dynCall_iiiijjjii = c.asm.Lg).apply(null, arguments);
			}),
			De = (c.dynCall_iiij = function () {
				return (De = c.dynCall_iiij = c.asm.Mg).apply(null, arguments);
			}),
			Ae = (c.dynCall_j = function () {
				return (Ae = c.dynCall_j = c.asm.Ng).apply(null, arguments);
			}),
			Te = (c.dynCall_iiiiij = function () {
				return (Te = c.dynCall_iiiiij = c.asm.Og).apply(null, arguments);
			}),
			Ce = (c.dynCall_iiiiiijj = function () {
				return (Ce = c.dynCall_iiiiiijj = c.asm.Pg).apply(null, arguments);
			}),
			Le = (c.dynCall_viijii = function () {
				return (Le = c.dynCall_viijii = c.asm.Qg).apply(null, arguments);
			}),
			Oe = (c.dynCall_iiiij = function () {
				return (Oe = c.dynCall_iiiij = c.asm.Rg).apply(null, arguments);
			}),
			Se = (c.dynCall_vijii = function () {
				return (Se = c.dynCall_vijii = c.asm.Sg).apply(null, arguments);
			}),
			Ge = (c.dynCall_iijii = function () {
				return (Ge = c.dynCall_iijii = c.asm.Tg).apply(null, arguments);
			}),
			Ne = (c.dynCall_iiiiiij = function () {
				return (Ne = c.dynCall_iiiiiij = c.asm.Ug).apply(null, arguments);
			}),
			Fe = (c.dynCall_vij = function () {
				return (Fe = c.dynCall_vij = c.asm.Vg).apply(null, arguments);
			}),
			je = (c.dynCall_iiiiji = function () {
				return (je = c.dynCall_iiiiji = c.asm.Wg).apply(null, arguments);
			}),
			Pe = (c.dynCall_ij = function () {
				return (Pe = c.dynCall_ij = c.asm.Xg).apply(null, arguments);
			}),
			Re = (c.dynCall_viiji = function () {
				return (Re = c.dynCall_viiji = c.asm.Yg).apply(null, arguments);
			}),
			ke = (c.dynCall_viij = function () {
				return (ke = c.dynCall_viij = c.asm.Zg).apply(null, arguments);
			}),
			Me = (c.dynCall_jiii = function () {
				return (Me = c.dynCall_jiii = c.asm._g).apply(null, arguments);
			}),
			Ie = (c.dynCall_viiiij = function () {
				return (Ie = c.dynCall_viiiij = c.asm.$g).apply(null, arguments);
			}),
			xe = (c.dynCall_iiiiiji = function () {
				return (xe = c.dynCall_iiiiiji = c.asm.ah).apply(null, arguments);
			}),
			Be = (c.dynCall_viiiji = function () {
				return (Be = c.dynCall_viiiji = c.asm.bh).apply(null, arguments);
			}),
			Ue = (c.dynCall_iiijiiiiii = function () {
				return (Ue = c.dynCall_iiijiiiiii = c.asm.ch).apply(null, arguments);
			}),
			Ke = (c.dynCall_jij = function () {
				return (Ke = c.dynCall_jij = c.asm.dh).apply(null, arguments);
			}),
			ze = (c.dynCall_vj = function () {
				return (ze = c.dynCall_vj = c.asm.eh).apply(null, arguments);
			}),
			We = (c.dynCall_iiiiiiiiiiiiijjji = function () {
				return (We = c.dynCall_iiiiiiiiiiiiijjji = c.asm.fh).apply(null, arguments);
			}),
			Ye = (c.dynCall_iiiiiiiiiiijji = function () {
				return (Ye = c.dynCall_iiiiiiiiiiijji = c.asm.gh).apply(null, arguments);
			}),
			Ve = (c.dynCall_iiijiiiiiii = function () {
				return (Ve = c.dynCall_iiijiiiiiii = c.asm.hh).apply(null, arguments);
			}),
			He = (c.dynCall_viiiiiji = function () {
				return (He = c.dynCall_viiiiiji = c.asm.ih).apply(null, arguments);
			}),
			Xe = (c.dynCall_iiiiiiijiii = function () {
				return (Xe = c.dynCall_iiiiiiijiii = c.asm.jh).apply(null, arguments);
			}),
			qe = (c.dynCall_iiiddddj = function () {
				return (qe = c.dynCall_iiiddddj = c.asm.kh).apply(null, arguments);
			}),
			Qe = (c.dynCall_iiiiiijii = function () {
				return (Qe = c.dynCall_iiiiiijii = c.asm.lh).apply(null, arguments);
			}),
			Ze = (c.dynCall_jiiiiiiiiiiiiiiiiiiiiiiiii = function () {
				return (Ze = c.dynCall_jiiiiiiiiiiiiiiiiiiiiiiiii = c.asm.mh).apply(null, arguments);
			}),
			Je = (c.dynCall_iiijiii = function () {
				return (Je = c.dynCall_iiijiii = c.asm.nh).apply(null, arguments);
			}),
			$e = (c.dynCall_iiijjiji = function () {
				return ($e = c.dynCall_iiijjiji = c.asm.oh).apply(null, arguments);
			}),
			tr = (c.dynCall_iiiiiiiiiiiiijjii = function () {
				return (tr = c.dynCall_iiiiiiiiiiiiijjii = c.asm.ph).apply(null, arguments);
			}),
			er = (c.dynCall_iiiiijiiiii = function () {
				return (er = c.dynCall_iiiiijiiiii = c.asm.qh).apply(null, arguments);
			}),
			rr = (c.dynCall_iji = function () {
				return (rr = c.dynCall_iji = c.asm.rh).apply(null, arguments);
			}),
			nr = (c.dynCall_iiiiiijjii = function () {
				return (nr = c.dynCall_iiiiiijjii = c.asm.sh).apply(null, arguments);
			}),
			ar = (c.dynCall_jiiji = function () {
				return (ar = c.dynCall_jiiji = c.asm.th).apply(null, arguments);
			}),
			ir = (c.dynCall_jiijji = function () {
				return (ir = c.dynCall_jiijji = c.asm.uh).apply(null, arguments);
			}),
			or = (c.dynCall_viijj = function () {
				return (or = c.dynCall_viijj = c.asm.vh).apply(null, arguments);
			}),
			sr = (c.dynCall_vijjj = function () {
				return (sr = c.dynCall_vijjj = c.asm.wh).apply(null, arguments);
			}),
			ur = (c.dynCall_viijjji = function () {
				return (ur = c.dynCall_viijjji = c.asm.xh).apply(null, arguments);
			}),
			cr = (c.dynCall_vijj = function () {
				return (cr = c.dynCall_vijj = c.asm.yh).apply(null, arguments);
			}),
			lr = (c.dynCall_iiijj = function () {
				return (lr = c.dynCall_iiijj = c.asm.zh).apply(null, arguments);
			}),
			fr = (c.dynCall_viiijj = function () {
				return (fr = c.dynCall_viiijj = c.asm.Ah).apply(null, arguments);
			}),
			dr = (c.dynCall_iiijiiii = function () {
				return (dr = c.dynCall_iiijiiii = c.asm.Bh).apply(null, arguments);
			}),
			pr = (c.dynCall_iiijiiiji = function () {
				return (pr = c.dynCall_iiijiiiji = c.asm.Ch).apply(null, arguments);
			}),
			mr = (c.dynCall_iiijiiiii = function () {
				return (mr = c.dynCall_iiijiiiii = c.asm.Dh).apply(null, arguments);
			}),
			hr = (c.dynCall_iiiiiiiijjji = function () {
				return (hr = c.dynCall_iiiiiiiijjji = c.asm.Eh).apply(null, arguments);
			}),
			yr = (c.dynCall_iiiiiiiijiii = function () {
				return (yr = c.dynCall_iiiiiiiijiii = c.asm.Fh).apply(null, arguments);
			}),
			_r = (c.dynCall_iiijjii = function () {
				return (_r = c.dynCall_iiijjii = c.asm.Gh).apply(null, arguments);
			}),
			gr = (c.dynCall_iiiiijjii = function () {
				return (gr = c.dynCall_iiiiijjii = c.asm.Hh).apply(null, arguments);
			}),
			Er = (c.dynCall_iiiiiiijji = function () {
				return (Er = c.dynCall_iiiiiiijji = c.asm.Ih).apply(null, arguments);
			}),
			wr = (c.dynCall_vijiii = function () {
				return (wr = c.dynCall_vijiii = c.asm.Jh).apply(null, arguments);
			}),
			vr = (c.dynCall_vijid = function () {
				return (vr = c.dynCall_vijid = c.asm.Kh).apply(null, arguments);
			}),
			br = (c.dynCall_iiiiiiiijii = function () {
				return (br = c.dynCall_iiiiiiiijii = c.asm.Lh).apply(null, arguments);
			}),
			Dr = (c.dynCall_iiiiijiiii = function () {
				return (Dr = c.dynCall_iiiiijiiii = c.asm.Mh).apply(null, arguments);
			}),
			Ar = (c.dynCall_viji = function () {
				return (Ar = c.dynCall_viji = c.asm.Nh).apply(null, arguments);
			}),
			Tr = (c.dynCall_viijji = function () {
				return (Tr = c.dynCall_viijji = c.asm.Oh).apply(null, arguments);
			}),
			Cr = (c.dynCall_jijj = function () {
				return (Cr = c.dynCall_jijj = c.asm.Ph).apply(null, arguments);
			}),
			Lr = (c.dynCall_iijjjddi = function () {
				return (Lr = c.dynCall_iijjjddi = c.asm.Qh).apply(null, arguments);
			}),
			Or = (c.dynCall_vijiidddi = function () {
				return (Or = c.dynCall_vijiidddi = c.asm.Rh).apply(null, arguments);
			}),
			Sr = (c.dynCall_jiiid = function () {
				return (Sr = c.dynCall_jiiid = c.asm.Sh).apply(null, arguments);
			}),
			Gr = (c.dynCall_iiiiiiiiiijiiiii = function () {
				return (Gr = c.dynCall_iiiiiiiiiijiiiii = c.asm.Th).apply(null, arguments);
			}),
			Nr = (c.dynCall_jji = function () {
				return (Nr = c.dynCall_jji = c.asm.Uh).apply(null, arguments);
			}),
			Fr = (c.dynCall_viiij = function () {
				return (Fr = c.dynCall_viiij = c.asm.Vh).apply(null, arguments);
			}),
			jr = (c.dynCall_iiiijji = function () {
				return (jr = c.dynCall_iiiijji = c.asm.Wh).apply(null, arguments);
			}),
			Pr = (c.dynCall_iiiijiiiii = function () {
				return (Pr = c.dynCall_iiiijiiiii = c.asm.Xh).apply(null, arguments);
			}),
			Rr = (c.dynCall_iiiiiiiiiiiiiijj = function () {
				return (Rr = c.dynCall_iiiiiiiiiiiiiijj = c.asm.Yh).apply(null, arguments);
			});
		function kr() {
			function t() {
				se ||
					((se = !0),
					(c.calledRun = !0),
					it ||
						(c.noFSInit || S.init.initialized || S.init(),
						(S.ignorePermissions = !1),
						(N.root = S.mount(N, {}, null)),
						St(gt),
						M(c),
						c.onRuntimeInitialized && c.onRuntimeInitialized(),
						vt()));
			}
			0 < r ||
				(wt(),
				0 < r ||
					(c.setStatus
						? (c.setStatus('Running...'),
						  setTimeout(function () {
								setTimeout(function () {
									c.setStatus('');
								}, 1),
									t();
						  }, 1))
						: t()));
		}
		if (
			((c.stringToUTF8 = mt),
			(c.lengthBytesUTF8 = ht),
			(c.addRunDependency = Dt),
			(c.removeRunDependency = At),
			(c.FS_createPath = S.createPath),
			(c.FS_createDataFile = S.createDataFile),
			(c.FS_createPreloadedFile = S.createPreloadedFile),
			(c.FS_createLazyFile = S.createLazyFile),
			(c.FS_createDevice = S.createDevice),
			(c.FS_unlink = S.unlink),
			(c.ENV = Vt),
			(c.ccall = ie),
			(c.cwrap = function (t, e, r, n) {
				var a = (r = r || []).every(function (t) {
					return 'number' === t;
				});
				return 'string' !== e && a && !n
					? ae(t)
					: function () {
							return ie(t, e, r, arguments);
					  };
			}),
			(c.addFunction = function (e, r) {
				if (!F) {
					F = new WeakMap();
					var t = 0,
						n = h.length;
					if (F)
						for (var a = t; a < t + n; a++) {
							var i = C(a);
							i && F.set(i, a);
						}
				}
				if (F.has(e)) return F.get(e);
				var o = (function () {
					if (re.length) return re.pop();
					try {
						h.grow(1);
					} catch (t) {
						if (t instanceof RangeError) throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
						throw t;
					}
					return h.length - 1;
				})();
				try {
					ne(o, e);
				} catch (t) {
					if (!(t instanceof TypeError)) throw t;
					ne(o, ee(e, r));
				}
				return F.set(e, o), o;
			}),
			(c.setValue = function (t, e) {
				var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 'i8';
				switch ((r = r.endsWith('*') ? '*' : r)) {
					case 'i1':
					case 'i8':
						d[t >> 0] = e;
						break;
					case 'i16':
						ut[t >> 1] = e;
						break;
					case 'i32':
						_[t >> 2] = e;
						break;
					case 'i64':
						(w = [
							e >>> 0,
							((E = e),
							1 <= +Math.abs(E)
								? 0 < E
									? (0 | Math.min(+Math.floor(E / 4294967296), 4294967295)) >>> 0
									: ~~+Math.ceil((E - (~~E >>> 0)) / 4294967296) >>> 0
								: 0),
						]),
							(_[t >> 2] = w[0]),
							(_[(t + 4) >> 2] = w[1]);
						break;
					case 'float':
						ct[t >> 2] = e;
						break;
					case 'double':
						lt[t >> 3] = e;
						break;
					case '*':
						m[t >> 2] = e;
						break;
					default:
						v('invalid type for setValue: ' + r);
				}
			}),
			(c.getValue = function (t) {
				var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'i8';
				switch ((e = e.endsWith('*') ? '*' : e)) {
					case 'i1':
					case 'i8':
						return d[t >> 0];
					case 'i16':
						return ut[t >> 1];
					case 'i32':
					case 'i64':
						return _[t >> 2];
					case 'float':
						return ct[t >> 2];
					case 'double':
						return lt[t >> 3];
					case '*':
						return m[t >> 2];
					default:
						v('invalid type for getValue: ' + e);
				}
				return null;
			}),
			(c.FS = S),
			(c.MEMFS = T),
			(c.WORKERFS = O),
			(c.NODEFS = L),
			(bt = function t() {
				se || kr(), se || (bt = t);
			}),
			c.preInit)
		)
			for ('function' == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length; )
				c.preInit.pop()();
		return kr(), k.ready;
	}
	(Ir =
		'undefined' != typeof document && document.currentScript ? document.currentScript.src : void 0),
		'undefined' != typeof __filename && (Ir = Ir || __filename),
		(U.exports = K);
	var z = t.exports,
		g = { Module: {} };
	function d() {
		var t = g.CPLGetLastErrorMsg(),
			e = g.CPLGetLastErrorNo();
		return g.CPLErrorReset(), { no: e, message: t };
	}
	function E(t) {
		for (var e = [], r = {}, n = 0; n < t.length; n += 1) {
			var a = t[n];
			'--config' === a ? ((r[t[n + 1]] = t[n + 2]), (n += 2)) : e.push(a);
		}
		var i = e.map(function (t) {
				return g.Module._malloc(g.Module.lengthBytesUTF8(t) + 1);
			}),
			o = (i.push(0), Uint32Array.from(i)),
			s =
				(e.forEach(function (t, e) {
					g.Module.stringToUTF8(t, o[e], g.Module.lengthBytesUTF8(t) + 1);
				}),
				g.Module._malloc(o.length * o.BYTES_PER_ELEMENT));
		return g.Module.HEAPU32.set(o, s / o.BYTES_PER_ELEMENT), { ptr: s, ptrArray: i, config: r };
	}
	function w(t) {
		g.Module._free(t.ptr),
			t.ptrArray.forEach(function (t) {
				g.Module._free(t);
			});
	}
	var p = '/input',
		m = '/output',
		l = m;
	var U = {},
		W = e(Object.freeze({ __proto__: null, default: {} })),
		u = U;
	(u.parser = function (t, e) {
		return new o(t, e);
	}),
		(u.SAXParser = o),
		(u.SAXStream = a),
		(u.createStream = function (t, e) {
			return new a(t, e);
		}),
		(u.MAX_BUFFER_LENGTH = 65536);
	var n,
		c = [
			'comment',
			'sgmlDecl',
			'textNode',
			'tagName',
			'doctype',
			'procInstName',
			'procInstBody',
			'entity',
			'attribName',
			'attribValue',
			'cdata',
			'script',
		];
	function o(t, e) {
		if (!(this instanceof o)) return new o(t, e);
		for (var r = this, n = r, a = 0, i = c.length; a < i; a++) n[c[a]] = '';
		(r.q = r.c = ''),
			(r.bufferCheckPosition = u.MAX_BUFFER_LENGTH),
			(r.opt = e || {}),
			(r.opt.lowercase = r.opt.lowercase || r.opt.lowercasetags),
			(r.looseCase = r.opt.lowercase ? 'toLowerCase' : 'toUpperCase'),
			(r.tags = []),
			(r.closed = r.closedRoot = r.sawRoot = !1),
			(r.tag = r.error = null),
			(r.strict = !!t),
			(r.noscript = !(!t && !r.opt.noscript)),
			(r.state = _.BEGIN),
			(r.strictEntities = r.opt.strictEntities),
			(r.ENTITIES = r.strictEntities ? Object.create(u.XML_ENTITIES) : Object.create(u.ENTITIES)),
			(r.attribList = []),
			r.opt.xmlns && (r.ns = Object.create(Q)),
			(r.trackPosition = !1 !== r.opt.position),
			r.trackPosition && (r.position = r.line = r.column = 0),
			v(r, 'onready');
	}
	(u.EVENTS = [
		'text',
		'processinginstruction',
		'sgmldeclaration',
		'doctype',
		'comment',
		'opentagstart',
		'attribute',
		'opentag',
		'closetag',
		'opencdata',
		'cdata',
		'closecdata',
		'error',
		'end',
		'ready',
		'script',
		'opennamespace',
		'closenamespace',
	]),
		Object.create ||
			(Object.create = function (t) {
				function e() {}
				return (e.prototype = t), new e();
			}),
		Object.keys ||
			(Object.keys = function (t) {
				var e,
					r = [];
				for (e in t) t.hasOwnProperty(e) && r.push(e);
				return r;
			}),
		(o.prototype = {
			end: function () {
				ot(this);
			},
			write: function (t) {
				var e = this;
				if (this.error) throw this.error;
				if (e.closed) return it(e, 'Cannot write after close. Assign an onready handler.');
				if (null === t) return ot(e);
				'object' == typeof t && (t = t.toString());
				var r,
					n,
					a = 0,
					i = '';
				for (;;) {
					if (((i = ft(t, a++)), !(e.c = i))) break;
					switch (
						(e.trackPosition &&
							(e.position++, '\n' === i ? (e.line++, (e.column = 0)) : e.column++),
						e.state)
					) {
						case _.BEGIN:
							if (((e.state = _.BEGIN_WHITESPACE), '\ufeff' === i)) continue;
							lt(e, i);
							continue;
						case _.BEGIN_WHITESPACE:
							lt(e, i);
							continue;
						case _.TEXT:
							if (e.sawRoot && !e.closedRoot) {
								for (var o = a - 1; i && '<' !== i && '&' !== i; )
									(i = ft(t, a++)) &&
										e.trackPosition &&
										(e.position++, '\n' === i ? (e.line++, (e.column = 0)) : e.column++);
								e.textNode += t.substring(o, a - 1);
							}
							'<' !== i || (e.sawRoot && e.closedRoot && !e.strict)
								? (h(i) || (e.sawRoot && !e.closedRoot) || A(e, 'Text data outside of root node.'),
								  '&' === i ? (e.state = _.TEXT_ENTITY) : (e.textNode += i))
								: ((e.state = _.OPEN_WAKA), (e.startTagPosition = e.position));
							continue;
						case _.SCRIPT:
							'<' === i ? (e.state = _.SCRIPT_ENDING) : (e.script += i);
							continue;
						case _.SCRIPT_ENDING:
							'/' === i ? (e.state = _.CLOSE_TAG) : ((e.script += '<' + i), (e.state = _.SCRIPT));
							continue;
						case _.OPEN_WAKA:
							'!' === i
								? ((e.state = _.SGML_DECL), (e.sgmlDecl = ''))
								: h(i) ||
								  (y(f, i)
										? ((e.state = _.OPEN_TAG), (e.tagName = i))
										: '/' === i
										? ((e.state = _.CLOSE_TAG), (e.tagName = ''))
										: '?' === i
										? ((e.state = _.PROC_INST), (e.procInstName = e.procInstBody = ''))
										: (A(e, 'Unencoded <'),
										  e.startTagPosition + 1 < e.position &&
												((o = e.position - e.startTagPosition), (i = new Array(o).join(' ') + i)),
										  (e.textNode += '<' + i),
										  (e.state = _.TEXT)));
							continue;
						case _.SGML_DECL:
							(e.sgmlDecl + i).toUpperCase() === V
								? (b(e, 'onopencdata'), (e.state = _.CDATA), (e.sgmlDecl = ''), (e.cdata = ''))
								: e.sgmlDecl + i === '--'
								? ((e.state = _.COMMENT), (e.comment = ''), (e.sgmlDecl = ''))
								: (e.sgmlDecl + i).toUpperCase() === H
								? ((e.state = _.DOCTYPE),
								  (e.doctype || e.sawRoot) && A(e, 'Inappropriately located doctype declaration'),
								  (e.doctype = ''),
								  (e.sgmlDecl = ''))
								: '>' === i
								? (b(e, 'onsgmldeclaration', e.sgmlDecl), (e.sgmlDecl = ''), (e.state = _.TEXT))
								: (tt(i) && (e.state = _.SGML_DECL_QUOTED), (e.sgmlDecl += i));
							continue;
						case _.SGML_DECL_QUOTED:
							i === e.q && ((e.state = _.SGML_DECL), (e.q = '')), (e.sgmlDecl += i);
							continue;
						case _.DOCTYPE:
							'>' === i
								? ((e.state = _.TEXT), b(e, 'ondoctype', e.doctype), (e.doctype = !0))
								: ((e.doctype += i),
								  '[' === i
										? (e.state = _.DOCTYPE_DTD)
										: tt(i) && ((e.state = _.DOCTYPE_QUOTED), (e.q = i)));
							continue;
						case _.DOCTYPE_QUOTED:
							(e.doctype += i), i === e.q && ((e.q = ''), (e.state = _.DOCTYPE));
							continue;
						case _.DOCTYPE_DTD:
							(e.doctype += i),
								']' === i
									? (e.state = _.DOCTYPE)
									: tt(i) && ((e.state = _.DOCTYPE_DTD_QUOTED), (e.q = i));
							continue;
						case _.DOCTYPE_DTD_QUOTED:
							(e.doctype += i), i === e.q && ((e.state = _.DOCTYPE_DTD), (e.q = ''));
							continue;
						case _.COMMENT:
							'-' === i ? (e.state = _.COMMENT_ENDING) : (e.comment += i);
							continue;
						case _.COMMENT_ENDING:
							'-' === i
								? ((e.state = _.COMMENT_ENDED),
								  (e.comment = at(e.opt, e.comment)),
								  e.comment && b(e, 'oncomment', e.comment),
								  (e.comment = ''))
								: ((e.comment += '-' + i), (e.state = _.COMMENT));
							continue;
						case _.COMMENT_ENDED:
							'>' !== i
								? (A(e, 'Malformed comment'), (e.comment += '--' + i), (e.state = _.COMMENT))
								: (e.state = _.TEXT);
							continue;
						case _.CDATA:
							']' === i ? (e.state = _.CDATA_ENDING) : (e.cdata += i);
							continue;
						case _.CDATA_ENDING:
							']' === i
								? (e.state = _.CDATA_ENDING_2)
								: ((e.cdata += ']' + i), (e.state = _.CDATA));
							continue;
						case _.CDATA_ENDING_2:
							'>' === i
								? (e.cdata && b(e, 'oncdata', e.cdata),
								  b(e, 'onclosecdata'),
								  (e.cdata = ''),
								  (e.state = _.TEXT))
								: ']' === i
								? (e.cdata += ']')
								: ((e.cdata += ']]' + i), (e.state = _.CDATA));
							continue;
						case _.PROC_INST:
							'?' === i
								? (e.state = _.PROC_INST_ENDING)
								: h(i)
								? (e.state = _.PROC_INST_BODY)
								: (e.procInstName += i);
							continue;
						case _.PROC_INST_BODY:
							if (!e.procInstBody && h(i)) continue;
							'?' === i ? (e.state = _.PROC_INST_ENDING) : (e.procInstBody += i);
							continue;
						case _.PROC_INST_ENDING:
							'>' === i
								? (b(e, 'onprocessinginstruction', { name: e.procInstName, body: e.procInstBody }),
								  (e.procInstName = e.procInstBody = ''),
								  (e.state = _.TEXT))
								: ((e.procInstBody += '?' + i), (e.state = _.PROC_INST_BODY));
							continue;
						case _.OPEN_TAG:
							y(Z, i)
								? (e.tagName += i)
								: ((function (t) {
										t.strict || (t.tagName = t.tagName[t.looseCase]());
										var e = t.tags[t.tags.length - 1] || t,
											r = (t.tag = { name: t.tagName, attributes: {} });
										t.opt.xmlns && (r.ns = e.ns);
										(t.attribList.length = 0), b(t, 'onopentagstart', r);
								  })(e),
								  '>' === i
										? T(e)
										: '/' === i
										? (e.state = _.OPEN_TAG_SLASH)
										: (h(i) || A(e, 'Invalid character in tag name'), (e.state = _.ATTRIB)));
							continue;
						case _.OPEN_TAG_SLASH:
							'>' === i
								? (T(e, !0), ct(e))
								: (A(e, 'Forward-slash in opening tag not followed by >'), (e.state = _.ATTRIB));
							continue;
						case _.ATTRIB:
							if (h(i)) continue;
							'>' === i
								? T(e)
								: '/' === i
								? (e.state = _.OPEN_TAG_SLASH)
								: y(f, i)
								? ((e.attribName = i), (e.attribValue = ''), (e.state = _.ATTRIB_NAME))
								: A(e, 'Invalid attribute name');
							continue;
						case _.ATTRIB_NAME:
							'=' === i
								? (e.state = _.ATTRIB_VALUE)
								: '>' === i
								? (A(e, 'Attribute without value'), (e.attribValue = e.attribName), ut(e), T(e))
								: h(i)
								? (e.state = _.ATTRIB_NAME_SAW_WHITE)
								: y(Z, i)
								? (e.attribName += i)
								: A(e, 'Invalid attribute name');
							continue;
						case _.ATTRIB_NAME_SAW_WHITE:
							if ('=' === i) e.state = _.ATTRIB_VALUE;
							else {
								if (h(i)) continue;
								A(e, 'Attribute without value'),
									(e.tag.attributes[e.attribName] = ''),
									(e.attribValue = ''),
									b(e, 'onattribute', { name: e.attribName, value: '' }),
									(e.attribName = ''),
									'>' === i
										? T(e)
										: y(f, i)
										? ((e.attribName = i), (e.state = _.ATTRIB_NAME))
										: (A(e, 'Invalid attribute name'), (e.state = _.ATTRIB));
							}
							continue;
						case _.ATTRIB_VALUE:
							if (h(i)) continue;
							tt(i)
								? ((e.q = i), (e.state = _.ATTRIB_VALUE_QUOTED))
								: (A(e, 'Unquoted attribute value'),
								  (e.state = _.ATTRIB_VALUE_UNQUOTED),
								  (e.attribValue = i));
							continue;
						case _.ATTRIB_VALUE_QUOTED:
							if (i !== e.q) {
								'&' === i ? (e.state = _.ATTRIB_VALUE_ENTITY_Q) : (e.attribValue += i);
								continue;
							}
							ut(e), (e.q = ''), (e.state = _.ATTRIB_VALUE_CLOSED);
							continue;
						case _.ATTRIB_VALUE_CLOSED:
							h(i)
								? (e.state = _.ATTRIB)
								: '>' === i
								? T(e)
								: '/' === i
								? (e.state = _.OPEN_TAG_SLASH)
								: y(f, i)
								? (A(e, 'No whitespace between attributes'),
								  (e.attribName = i),
								  (e.attribValue = ''),
								  (e.state = _.ATTRIB_NAME))
								: A(e, 'Invalid attribute name');
							continue;
						case _.ATTRIB_VALUE_UNQUOTED:
							if (
								!(function (t) {
									return '>' === t || h(t);
								})(i)
							) {
								'&' === i ? (e.state = _.ATTRIB_VALUE_ENTITY_U) : (e.attribValue += i);
								continue;
							}
							ut(e), '>' === i ? T(e) : (e.state = _.ATTRIB);
							continue;
						case _.CLOSE_TAG:
							if (e.tagName)
								'>' === i
									? ct(e)
									: y(Z, i)
									? (e.tagName += i)
									: e.script
									? ((e.script += '</' + e.tagName), (e.tagName = ''), (e.state = _.SCRIPT))
									: (h(i) || A(e, 'Invalid tagname in closing tag'),
									  (e.state = _.CLOSE_TAG_SAW_WHITE));
							else {
								if (h(i)) continue;
								!(function (t, e) {
									return !y(t, e);
								})(f, i)
									? (e.tagName = i)
									: e.script
									? ((e.script += '</' + i), (e.state = _.SCRIPT))
									: A(e, 'Invalid tagname in closing tag.');
							}
							continue;
						case _.CLOSE_TAG_SAW_WHITE:
							if (h(i)) continue;
							'>' === i ? ct(e) : A(e, 'Invalid characters in closing tag');
							continue;
						case _.TEXT_ENTITY:
						case _.ATTRIB_VALUE_ENTITY_Q:
						case _.ATTRIB_VALUE_ENTITY_U:
							switch (e.state) {
								case _.TEXT_ENTITY:
									(r = _.TEXT), (n = 'textNode');
									break;
								case _.ATTRIB_VALUE_ENTITY_Q:
									(r = _.ATTRIB_VALUE_QUOTED), (n = 'attribValue');
									break;
								case _.ATTRIB_VALUE_ENTITY_U:
									(r = _.ATTRIB_VALUE_UNQUOTED), (n = 'attribValue');
							}
							';' === i
								? ((e[n] += (function (t) {
										var e,
											r = t.entity,
											n = r.toLowerCase(),
											a = '';
										if (t.ENTITIES[r]) return t.ENTITIES[r];
										if (t.ENTITIES[n]) return t.ENTITIES[n];
										'#' === (r = n).charAt(0) &&
											(a =
												'x' === r.charAt(1)
													? ((r = r.slice(2)), (e = parseInt(r, 16)).toString(16))
													: ((r = r.slice(1)), (e = parseInt(r, 10)).toString(10)));
										if (((r = r.replace(/^0+/, '')), isNaN(e) || a.toLowerCase() !== r))
											return A(t, 'Invalid character entity'), '&' + t.entity + ';';
										return String.fromCodePoint(e);
								  })(e)),
								  (e.entity = ''),
								  (e.state = r))
								: y(e.entity.length ? $ : J, i)
								? (e.entity += i)
								: (A(e, 'Invalid character in entity name'),
								  (e[n] += '&' + e.entity + i),
								  (e.entity = ''),
								  (e.state = r));
							continue;
						default:
							throw new Error(e, 'Unknown state: ' + e.state);
					}
				}
				e.position >= e.bufferCheckPosition &&
					!(function (t) {
						for (
							var e = Math.max(u.MAX_BUFFER_LENGTH, 10), r = 0, n = 0, a = c.length;
							n < a;
							n++
						) {
							var i = t[c[n]].length;
							if (e < i)
								switch (c[n]) {
									case 'textNode':
										D(t);
										break;
									case 'cdata':
										b(t, 'oncdata', t.cdata), (t.cdata = '');
										break;
									case 'script':
										b(t, 'onscript', t.script), (t.script = '');
										break;
									default:
										it(t, 'Max buffer length exceeded: ' + c[n]);
								}
							r = Math.max(r, i);
						}
						var o = u.MAX_BUFFER_LENGTH - r;
						t.bufferCheckPosition = o + t.position;
					})(e);
				return e;
			},
			resume: function () {
				return (this.error = null), this;
			},
			close: function () {
				return this.write(null);
			},
			flush: function () {
				var t;
				D((t = this)),
					'' !== t.cdata && (b(t, 'oncdata', t.cdata), (t.cdata = '')),
					'' !== t.script && (b(t, 'onscript', t.script), (t.script = ''));
			},
		});
	try {
		n = (void 0).Stream;
	} catch (t) {
		n = function () {};
	}
	var Y = u.EVENTS.filter(function (t) {
		return 'error' !== t && 'end' !== t;
	});
	function a(t, e) {
		if (!(this instanceof a)) return new a(t, e);
		n.apply(this), (this._parser = new o(t, e)), (this.writable = !0), (this.readable = !0);
		var r = this;
		(this._parser.onend = function () {
			r.emit('end');
		}),
			(this._parser.onerror = function (t) {
				r.emit('error', t), (r._parser.error = null);
			}),
			(this._decoder = null),
			Y.forEach(function (e) {
				Object.defineProperty(r, 'on' + e, {
					get: function () {
						return r._parser['on' + e];
					},
					set: function (t) {
						if (!t) return r.removeAllListeners(e), (r._parser['on' + e] = t);
						r.on(e, t);
					},
					enumerable: !0,
					configurable: !1,
				});
			});
	}
	((a.prototype = Object.create(n.prototype, { constructor: { value: a } })).write = function (t) {
		var e;
		return (
			'function' == typeof Buffer &&
				'function' == typeof Buffer.isBuffer &&
				Buffer.isBuffer(t) &&
				(this._decoder || ((e = W.StringDecoder), (this._decoder = new e('utf8'))),
				(t = this._decoder.write(t))),
			this._parser.write(t.toString()),
			this.emit('data', t),
			!0
		);
	}),
		(a.prototype.end = function (t) {
			return t && t.length && this.write(t), this._parser.end(), !0;
		}),
		(a.prototype.on = function (e, t) {
			var r = this;
			return (
				r._parser['on' + e] ||
					-1 === Y.indexOf(e) ||
					(r._parser['on' + e] = function () {
						var t = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
						t.splice(0, 0, e), r.emit.apply(r, t);
					}),
				n.prototype.on.call(r, e, t)
			);
		});
	var V = '[CDATA[',
		H = 'DOCTYPE',
		X = 'http://www.w3.org/XML/1998/namespace',
		q = 'http://www.w3.org/2000/xmlns/',
		Q = { xml: X, xmlns: q },
		f =
			/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
		Z =
			/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
		J =
			/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
		$ =
			/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
	function h(t) {
		return ' ' === t || '\n' === t || '\r' === t || '\t' === t;
	}
	function tt(t) {
		return '"' === t || "'" === t;
	}
	function y(t, e) {
		return t.test(e);
	}
	var et,
		rt,
		nt,
		_ = 0;
	for (et in ((u.STATE = {
		BEGIN: _++,
		BEGIN_WHITESPACE: _++,
		TEXT: _++,
		TEXT_ENTITY: _++,
		OPEN_WAKA: _++,
		SGML_DECL: _++,
		SGML_DECL_QUOTED: _++,
		DOCTYPE: _++,
		DOCTYPE_QUOTED: _++,
		DOCTYPE_DTD: _++,
		DOCTYPE_DTD_QUOTED: _++,
		COMMENT_STARTING: _++,
		COMMENT: _++,
		COMMENT_ENDING: _++,
		COMMENT_ENDED: _++,
		CDATA: _++,
		CDATA_ENDING: _++,
		CDATA_ENDING_2: _++,
		PROC_INST: _++,
		PROC_INST_BODY: _++,
		PROC_INST_ENDING: _++,
		OPEN_TAG: _++,
		OPEN_TAG_SLASH: _++,
		ATTRIB: _++,
		ATTRIB_NAME: _++,
		ATTRIB_NAME_SAW_WHITE: _++,
		ATTRIB_VALUE: _++,
		ATTRIB_VALUE_QUOTED: _++,
		ATTRIB_VALUE_CLOSED: _++,
		ATTRIB_VALUE_UNQUOTED: _++,
		ATTRIB_VALUE_ENTITY_Q: _++,
		ATTRIB_VALUE_ENTITY_U: _++,
		CLOSE_TAG: _++,
		CLOSE_TAG_SAW_WHITE: _++,
		SCRIPT: _++,
		SCRIPT_ENDING: _++,
	}),
	(u.XML_ENTITIES = { amp: '&', gt: '>', lt: '<', quot: '"', apos: "'" }),
	(u.ENTITIES = {
		amp: '&',
		gt: '>',
		lt: '<',
		quot: '"',
		apos: "'",
		AElig: 198,
		Aacute: 193,
		Acirc: 194,
		Agrave: 192,
		Aring: 197,
		Atilde: 195,
		Auml: 196,
		Ccedil: 199,
		ETH: 208,
		Eacute: 201,
		Ecirc: 202,
		Egrave: 200,
		Euml: 203,
		Iacute: 205,
		Icirc: 206,
		Igrave: 204,
		Iuml: 207,
		Ntilde: 209,
		Oacute: 211,
		Ocirc: 212,
		Ograve: 210,
		Oslash: 216,
		Otilde: 213,
		Ouml: 214,
		THORN: 222,
		Uacute: 218,
		Ucirc: 219,
		Ugrave: 217,
		Uuml: 220,
		Yacute: 221,
		aacute: 225,
		acirc: 226,
		aelig: 230,
		agrave: 224,
		aring: 229,
		atilde: 227,
		auml: 228,
		ccedil: 231,
		eacute: 233,
		ecirc: 234,
		egrave: 232,
		eth: 240,
		euml: 235,
		iacute: 237,
		icirc: 238,
		igrave: 236,
		iuml: 239,
		ntilde: 241,
		oacute: 243,
		ocirc: 244,
		ograve: 242,
		oslash: 248,
		otilde: 245,
		ouml: 246,
		szlig: 223,
		thorn: 254,
		uacute: 250,
		ucirc: 251,
		ugrave: 249,
		uuml: 252,
		yacute: 253,
		yuml: 255,
		copy: 169,
		reg: 174,
		nbsp: 160,
		iexcl: 161,
		cent: 162,
		pound: 163,
		curren: 164,
		yen: 165,
		brvbar: 166,
		sect: 167,
		uml: 168,
		ordf: 170,
		laquo: 171,
		not: 172,
		shy: 173,
		macr: 175,
		deg: 176,
		plusmn: 177,
		sup1: 185,
		sup2: 178,
		sup3: 179,
		acute: 180,
		micro: 181,
		para: 182,
		middot: 183,
		cedil: 184,
		ordm: 186,
		raquo: 187,
		frac14: 188,
		frac12: 189,
		frac34: 190,
		iquest: 191,
		times: 215,
		divide: 247,
		OElig: 338,
		oelig: 339,
		Scaron: 352,
		scaron: 353,
		Yuml: 376,
		fnof: 402,
		circ: 710,
		tilde: 732,
		Alpha: 913,
		Beta: 914,
		Gamma: 915,
		Delta: 916,
		Epsilon: 917,
		Zeta: 918,
		Eta: 919,
		Theta: 920,
		Iota: 921,
		Kappa: 922,
		Lambda: 923,
		Mu: 924,
		Nu: 925,
		Xi: 926,
		Omicron: 927,
		Pi: 928,
		Rho: 929,
		Sigma: 931,
		Tau: 932,
		Upsilon: 933,
		Phi: 934,
		Chi: 935,
		Psi: 936,
		Omega: 937,
		alpha: 945,
		beta: 946,
		gamma: 947,
		delta: 948,
		epsilon: 949,
		zeta: 950,
		eta: 951,
		theta: 952,
		iota: 953,
		kappa: 954,
		lambda: 955,
		mu: 956,
		nu: 957,
		xi: 958,
		omicron: 959,
		pi: 960,
		rho: 961,
		sigmaf: 962,
		sigma: 963,
		tau: 964,
		upsilon: 965,
		phi: 966,
		chi: 967,
		psi: 968,
		omega: 969,
		thetasym: 977,
		upsih: 978,
		piv: 982,
		ensp: 8194,
		emsp: 8195,
		thinsp: 8201,
		zwnj: 8204,
		zwj: 8205,
		lrm: 8206,
		rlm: 8207,
		ndash: 8211,
		mdash: 8212,
		lsquo: 8216,
		rsquo: 8217,
		sbquo: 8218,
		ldquo: 8220,
		rdquo: 8221,
		bdquo: 8222,
		dagger: 8224,
		Dagger: 8225,
		bull: 8226,
		hellip: 8230,
		permil: 8240,
		prime: 8242,
		Prime: 8243,
		lsaquo: 8249,
		rsaquo: 8250,
		oline: 8254,
		frasl: 8260,
		euro: 8364,
		image: 8465,
		weierp: 8472,
		real: 8476,
		trade: 8482,
		alefsym: 8501,
		larr: 8592,
		uarr: 8593,
		rarr: 8594,
		darr: 8595,
		harr: 8596,
		crarr: 8629,
		lArr: 8656,
		uArr: 8657,
		rArr: 8658,
		dArr: 8659,
		hArr: 8660,
		forall: 8704,
		part: 8706,
		exist: 8707,
		empty: 8709,
		nabla: 8711,
		isin: 8712,
		notin: 8713,
		ni: 8715,
		prod: 8719,
		sum: 8721,
		minus: 8722,
		lowast: 8727,
		radic: 8730,
		prop: 8733,
		infin: 8734,
		ang: 8736,
		and: 8743,
		or: 8744,
		cap: 8745,
		cup: 8746,
		int: 8747,
		there4: 8756,
		sim: 8764,
		cong: 8773,
		asymp: 8776,
		ne: 8800,
		equiv: 8801,
		le: 8804,
		ge: 8805,
		sub: 8834,
		sup: 8835,
		nsub: 8836,
		sube: 8838,
		supe: 8839,
		oplus: 8853,
		otimes: 8855,
		perp: 8869,
		sdot: 8901,
		lceil: 8968,
		rceil: 8969,
		lfloor: 8970,
		rfloor: 8971,
		lang: 9001,
		rang: 9002,
		loz: 9674,
		spades: 9824,
		clubs: 9827,
		hearts: 9829,
		diams: 9830,
	}),
	Object.keys(u.ENTITIES).forEach(function (t) {
		var e = u.ENTITIES[t],
			e = 'number' == typeof e ? String.fromCharCode(e) : e;
		u.ENTITIES[t] = e;
	}),
	u.STATE))
		u.STATE[u.STATE[et]] = et;
	function v(t, e, r) {
		t[e] && t[e](r);
	}
	function b(t, e, r) {
		t.textNode && D(t), v(t, e, r);
	}
	function D(t) {
		(t.textNode = at(t.opt, t.textNode)),
			t.textNode && v(t, 'ontext', t.textNode),
			(t.textNode = '');
	}
	function at(t, e) {
		return t.trim && (e = e.trim()), (e = t.normalize ? e.replace(/\s+/g, ' ') : e);
	}
	function it(t, e) {
		return (
			D(t),
			t.trackPosition && (e += '\nLine: ' + t.line + '\nColumn: ' + t.column + '\nChar: ' + t.c),
			(e = new Error(e)),
			(t.error = e),
			v(t, 'onerror', e),
			t
		);
	}
	function ot(t) {
		return (
			t.sawRoot && !t.closedRoot && A(t, 'Unclosed root tag'),
			t.state !== _.BEGIN &&
				t.state !== _.BEGIN_WHITESPACE &&
				t.state !== _.TEXT &&
				it(t, 'Unexpected end'),
			D(t),
			(t.c = ''),
			(t.closed = !0),
			v(t, 'onend'),
			o.call(t, t.strict, t.opt),
			t
		);
	}
	function A(t, e) {
		if ('object' != typeof t || !(t instanceof o)) throw new Error('bad call to strictFail');
		t.strict && it(t, e);
	}
	function st(t, e) {
		var r = t.indexOf(':') < 0 ? ['', t] : t.split(':'),
			n = r[0],
			r = r[1];
		return e && 'xmlns' === t && ((n = 'xmlns'), (r = '')), { prefix: n, local: r };
	}
	function ut(t) {
		var e, r, n;
		t.strict || (t.attribName = t.attribName[t.looseCase]()),
			-1 !== t.attribList.indexOf(t.attribName) ||
				t.tag.attributes.hasOwnProperty(t.attribName) ||
				(t.opt.xmlns
					? ((r = (e = st(t.attribName, !0)).prefix),
					  (e = e.local),
					  'xmlns' === r &&
							('xml' === e && t.attribValue !== X
								? A(t, 'xml: prefix must be bound to ' + X + '\nActual: ' + t.attribValue)
								: 'xmlns' === e && t.attribValue !== q
								? A(t, 'xmlns: prefix must be bound to ' + q + '\nActual: ' + t.attribValue)
								: ((r = t.tag),
								  (n = t.tags[t.tags.length - 1] || t),
								  r.ns === n.ns && (r.ns = Object.create(n.ns)),
								  (r.ns[e] = t.attribValue))),
					  t.attribList.push([t.attribName, t.attribValue]))
					: ((t.tag.attributes[t.attribName] = t.attribValue),
					  b(t, 'onattribute', { name: t.attribName, value: t.attribValue }))),
			(t.attribName = t.attribValue = '');
	}
	function T(e, t) {
		if (e.opt.xmlns) {
			var r = e.tag,
				n = st(e.tagName),
				n =
					((r.prefix = n.prefix),
					(r.local = n.local),
					(r.uri = r.ns[n.prefix] || ''),
					r.prefix &&
						!r.uri &&
						(A(e, 'Unbound namespace prefix: ' + JSON.stringify(e.tagName)), (r.uri = n.prefix)),
					e.tags[e.tags.length - 1] || e);
			r.ns &&
				n.ns !== r.ns &&
				Object.keys(r.ns).forEach(function (t) {
					b(e, 'onopennamespace', { prefix: t, uri: r.ns[t] });
				});
			for (var a = 0, i = e.attribList.length; a < i; a++) {
				var o = e.attribList[a],
					s = o[0],
					o = o[1],
					u = st(s, !0),
					c = u.prefix,
					u = u.local,
					l = ('' !== c && r.ns[c]) || '',
					o = { name: s, value: o, prefix: c, local: u, uri: l };
				c &&
					'xmlns' !== c &&
					!l &&
					(A(e, 'Unbound namespace prefix: ' + JSON.stringify(c)), (o.uri = c)),
					(e.tag.attributes[s] = o),
					b(e, 'onattribute', o);
			}
			e.attribList.length = 0;
		}
		(e.tag.isSelfClosing = !!t),
			(e.sawRoot = !0),
			e.tags.push(e.tag),
			b(e, 'onopentag', e.tag),
			t ||
				(e.noscript || 'script' !== e.tagName.toLowerCase()
					? (e.state = _.TEXT)
					: (e.state = _.SCRIPT),
				(e.tag = null),
				(e.tagName = '')),
			(e.attribName = e.attribValue = ''),
			(e.attribList.length = 0);
	}
	function ct(r) {
		if (!r.tagName)
			return A(r, 'Weird empty close tag.'), (r.textNode += '</>'), void (r.state = _.TEXT);
		if (r.script) {
			if ('script' !== r.tagName)
				return (r.script += '</' + r.tagName + '>'), (r.tagName = ''), void (r.state = _.SCRIPT);
			b(r, 'onscript', r.script), (r.script = '');
		}
		for (
			var t = r.tags.length, e = r.tagName, n = (e = r.strict ? e : e[r.looseCase]());
			t-- && r.tags[t].name !== n;

		)
			A(r, 'Unexpected close tag');
		if (t < 0)
			return (
				A(r, 'Unmatched closing tag: ' + r.tagName),
				(r.textNode += '</' + r.tagName + '>'),
				void (r.state = _.TEXT)
			);
		r.tagName = e;
		for (var a = r.tags.length; a-- > t; ) {
			var i,
				o = (r.tag = r.tags.pop()),
				s = ((r.tagName = r.tag.name), b(r, 'onclosetag', r.tagName), {});
			for (i in o.ns) s[i] = o.ns[i];
			var u = r.tags[r.tags.length - 1] || r;
			r.opt.xmlns &&
				o.ns !== u.ns &&
				Object.keys(o.ns).forEach(function (t) {
					var e = o.ns[t];
					b(r, 'onclosenamespace', { prefix: t, uri: e });
				});
		}
		0 === t && (r.closedRoot = !0),
			(r.tagName = r.attribValue = r.attribName = ''),
			(r.attribList.length = 0),
			(r.state = _.TEXT);
	}
	function lt(t, e) {
		'<' === e
			? ((t.state = _.OPEN_WAKA), (t.startTagPosition = t.position))
			: h(e) || (A(t, 'Non-whitespace before first tag.'), (t.textNode = e), (t.state = _.TEXT));
	}
	function ft(t, e) {
		var r = '';
		return (r = e < t.length ? t.charAt(e) : r);
	}
	function dt() {
		var t = [],
			e = -1,
			r = arguments.length;
		if (!r) return '';
		for (var n = ''; ++e < r; ) {
			var a = Number(arguments[e]);
			if (!isFinite(a) || a < 0 || 1114111 < a || nt(a) !== a)
				throw RangeError('Invalid code point: ' + a);
			a <= 65535 ? t.push(a) : ((a -= 65536), t.push(55296 + (a >> 10), (a % 1024) + 56320)),
				(e + 1 === r || 16384 < t.length) && ((n += rt.apply(null, t)), (t.length = 0));
		}
		return n;
	}
	(_ = u.STATE),
		String.fromCodePoint ||
			((rt = String.fromCharCode),
			(nt = Math.floor),
			Object.defineProperty
				? Object.defineProperty(String, 'fromCodePoint', {
						value: dt,
						configurable: !0,
						writable: !0,
				  })
				: (String.fromCodePoint = dt));
	var C,
		L,
		t = function (t) {
			return Array.isArray
				? Array.isArray(t)
				: '[object Array]' === Object.prototype.toString.call(t);
		},
		pt = t,
		mt = {
			copyOptions: function (t) {
				var e,
					r = {};
				for (e in t) t.hasOwnProperty(e) && (r[e] = t[e]);
				return r;
			},
			ensureFlagExists: function (t, e) {
				(t in e && 'boolean' == typeof e[t]) || (e[t] = !1);
			},
			ensureSpacesExists: function (t) {
				('spaces' in t && ('number' == typeof t.spaces || 'string' == typeof t.spaces)) ||
					(t.spaces = 0);
			},
			ensureAlwaysArrayExists: function (t) {
				('alwaysArray' in t && ('boolean' == typeof t.alwaysArray || pt(t.alwaysArray))) ||
					(t.alwaysArray = !1);
			},
			ensureKeyExists: function (t, e) {
				(t + 'Key' in e && 'string' == typeof e[t + 'Key']) ||
					(e[t + 'Key'] = e.compact ? '_' + t : t);
			},
			checkFnExists: function (t, e) {
				return t + 'Fn' in e;
			},
		},
		ht = U,
		O = mt,
		S = t;
	function yt(t) {
		var e = Number(t);
		if (!isNaN(e)) return e;
		e = t.toLowerCase();
		return 'true' === e || ('false' !== e && t);
	}
	function G(t, e) {
		var r, n;
		if (C.compact) {
			if (
				(!L[C[t + 'Key']] &&
					(S(C.alwaysArray) ? -1 !== C.alwaysArray.indexOf(C[t + 'Key']) : C.alwaysArray) &&
					(L[C[t + 'Key']] = []),
				L[C[t + 'Key']] && !S(L[C[t + 'Key']]) && (L[C[t + 'Key']] = [L[C[t + 'Key']]]),
				t + 'Fn' in C && 'string' == typeof e && (e = C[t + 'Fn'](e, L)),
				'instruction' === t && ('instructionFn' in C || 'instructionNameFn' in C))
			)
				for (r in e)
					e.hasOwnProperty(r) &&
						('instructionFn' in C
							? (e[r] = C.instructionFn(e[r], r, L))
							: ((n = e[r]), delete e[r], (e[C.instructionNameFn(r, n, L)] = n)));
			S(L[C[t + 'Key']]) ? L[C[t + 'Key']].push(e) : (L[C[t + 'Key']] = e);
		} else {
			L[C.elementsKey] || (L[C.elementsKey] = []);
			var a = {};
			if ('instruction' === (a[C.typeKey] = t)) {
				for (r in e) if (e.hasOwnProperty(r)) break;
				(a[C.nameKey] = 'instructionNameFn' in C ? C.instructionNameFn(r, e, L) : r),
					C.instructionHasAttributes
						? ((a[C.attributesKey] = e[r][C.attributesKey]),
						  'instructionFn' in C &&
								(a[C.attributesKey] = C.instructionFn(a[C.attributesKey], r, L)))
						: ('instructionFn' in C && (e[r] = C.instructionFn(e[r], r, L)),
						  (a[C.instructionKey] = e[r]));
			} else t + 'Fn' in C && (e = C[t + 'Fn'](e, L)), (a[C[t + 'Key']] = e);
			C.addParent && (a[C.parentKey] = L), L[C.elementsKey].push(a);
		}
	}
	function _t(t) {
		var e, r;
		if (
			('attributesFn' in C && t && (t = C.attributesFn(t, L)),
			(C.trim || 'attributeValueFn' in C || 'attributeNameFn' in C || C.nativeTypeAttributes) && t)
		)
			for (e in t)
				t.hasOwnProperty(e) &&
					(C.trim && (t[e] = t[e].trim()),
					C.nativeTypeAttributes && (t[e] = yt(t[e])),
					'attributeValueFn' in C && (t[e] = C.attributeValueFn(t[e], e, L)),
					'attributeNameFn' in C &&
						((r = t[e]), delete t[e], (t[C.attributeNameFn(e, t[e], L)] = r)));
		return t;
	}
	function gt(t) {
		var e,
			r = {};
		if (t.body && ('xml' === t.name.toLowerCase() || C.instructionHasAttributes)) {
			for (
				var n, a = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g;
				null !== (n = a.exec(t.body));

			)
				r[n[1]] = n[2] || n[3] || n[4];
			r = _t(r);
		}
		'xml' === t.name.toLowerCase()
			? C.ignoreDeclaration ||
			  ((L[C.declarationKey] = {}),
			  Object.keys(r).length && (L[C.declarationKey][C.attributesKey] = r),
			  C.addParent && (L[C.declarationKey][C.parentKey] = L))
			: C.ignoreInstruction ||
			  (C.trim && (t.body = t.body.trim()),
			  (e = {}),
			  C.instructionHasAttributes && Object.keys(r).length
					? ((e[t.name] = {}), (e[t.name][C.attributesKey] = r))
					: (e[t.name] = t.body),
			  G('instruction', e));
	}
	function Et(t, e) {
		if (
			('object' == typeof t && ((e = t.attributes), (t = t.name)),
			(e = _t(e)),
			'elementNameFn' in C && (t = C.elementNameFn(t, L)),
			C.compact)
		) {
			var r,
				n = {};
			if (!C.ignoreAttributes && e && Object.keys(e).length)
				for (r in ((n[C.attributesKey] = {}), e))
					e.hasOwnProperty(r) && (n[C.attributesKey][r] = e[r]);
			t in L ||
				(S(C.alwaysArray) ? -1 === C.alwaysArray.indexOf(t) : !C.alwaysArray) ||
				(L[t] = []),
				L[t] && !S(L[t]) && (L[t] = [L[t]]),
				S(L[t]) ? L[t].push(n) : (L[t] = n);
		} else L[C.elementsKey] || (L[C.elementsKey] = []), ((n = {})[C.typeKey] = 'element'), (n[C.nameKey] = t), !C.ignoreAttributes && e && Object.keys(e).length && (n[C.attributesKey] = e), C.alwaysChildren && (n[C.elementsKey] = []), L[C.elementsKey].push(n);
		(n[C.parentKey] = L), (L = n);
	}
	function wt(t) {
		C.ignoreText ||
			((t.trim() || C.captureSpacesBetweenElements) &&
				(C.trim && (t = t.trim()),
				C.nativeType && (t = yt(t)),
				G(
					'text',
					(t = C.sanitize
						? t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
						: t),
				)));
	}
	function vt(t) {
		C.ignoreComment || G('comment', (t = C.trim ? t.trim() : t));
	}
	function bt(t) {
		var e = L[C.parentKey];
		C.addParent || delete L[C.parentKey], (L = e);
	}
	function Dt(t) {
		C.ignoreCdata || G('cdata', (t = C.trim ? t.trim() : t));
	}
	function At(t) {
		C.ignoreDoctype || ((t = t.replace(/^ /, '')), G('doctype', (t = C.trim ? t.trim() : t)));
	}
	function Tt(t) {
		t.note = t;
	}
	function Ct(t, e) {
		var r = ht.parser(!0, {}),
			n = {};
		return (
			(L = n),
			(C = O.copyOptions(e)),
			O.ensureFlagExists('ignoreDeclaration', C),
			O.ensureFlagExists('ignoreInstruction', C),
			O.ensureFlagExists('ignoreAttributes', C),
			O.ensureFlagExists('ignoreText', C),
			O.ensureFlagExists('ignoreComment', C),
			O.ensureFlagExists('ignoreCdata', C),
			O.ensureFlagExists('ignoreDoctype', C),
			O.ensureFlagExists('compact', C),
			O.ensureFlagExists('alwaysChildren', C),
			O.ensureFlagExists('addParent', C),
			O.ensureFlagExists('trim', C),
			O.ensureFlagExists('nativeType', C),
			O.ensureFlagExists('nativeTypeAttributes', C),
			O.ensureFlagExists('sanitize', C),
			O.ensureFlagExists('instructionHasAttributes', C),
			O.ensureFlagExists('captureSpacesBetweenElements', C),
			O.ensureAlwaysArrayExists(C),
			O.ensureKeyExists('declaration', C),
			O.ensureKeyExists('instruction', C),
			O.ensureKeyExists('attributes', C),
			O.ensureKeyExists('text', C),
			O.ensureKeyExists('comment', C),
			O.ensureKeyExists('cdata', C),
			O.ensureKeyExists('doctype', C),
			O.ensureKeyExists('type', C),
			O.ensureKeyExists('name', C),
			O.ensureKeyExists('elements', C),
			O.ensureKeyExists('parent', C),
			(r.opt = { strictEntities: !0 }),
			(r.onopentag = Et),
			(r.ontext = wt),
			(r.oncomment = vt),
			(r.onclosetag = bt),
			(r.onerror = Tt),
			(r.oncdata = Dt),
			(r.ondoctype = At),
			(r.onprocessinginstruction = gt),
			r.write(t).close(),
			n[C.elementsKey] &&
				((e = n[C.elementsKey]), delete n[C.elementsKey], (n[C.elementsKey] = e), delete n.text),
			n
		);
	}
	var Lt = mt,
		Ot = Ct;
	var N,
		F,
		j = mt,
		St = t;
	function P(t, e, r) {
		return (!r && t.spaces ? '\n' : '') + Array(e + 1).join(t.spaces);
	}
	function Gt(t, e, r) {
		if (e.ignoreAttributes) return '';
		var n,
			a,
			i,
			o,
			s = [];
		for (n in (t = 'attributesFn' in e ? e.attributesFn(t, F, N) : t))
			t.hasOwnProperty(n) &&
				null !== t[n] &&
				void 0 !== t[n] &&
				((o = e.noQuotesForNativeAttributes && 'string' != typeof t[n] ? '' : '"'),
				(a = (a = '' + t[n]).replace(/"/g, '&quot;')),
				(i = 'attributeNameFn' in e ? e.attributeNameFn(n, a, F, N) : n),
				s.push(e.spaces && e.indentAttributes ? P(e, r + 1, !1) : ' '),
				s.push(i + '=' + o + ('attributeValueFn' in e ? e.attributeValueFn(a, n, F, N) : a) + o));
		return (
			t && Object.keys(t).length && e.spaces && e.indentAttributes && s.push(P(e, r, !1)),
			s.join('')
		);
	}
	function Nt(t, e, r) {
		return (
			(N = t), (F = 'xml'), e.ignoreDeclaration ? '' : '<?xml' + Gt(t[e.attributesKey], e, r) + '?>'
		);
	}
	function Ft(t, e, r) {
		if (e.ignoreInstruction) return '';
		for (var n in t) if (t.hasOwnProperty(n)) break;
		var a = 'instructionNameFn' in e ? e.instructionNameFn(n, t[n], F, N) : n;
		return 'object' == typeof t[n]
			? '<?' + (F = a) + Gt((N = t)[n][e.attributesKey], e, r) + '?>'
			: ((r = t[n] || ''),
			  '<?' +
					a +
					((r = 'instructionFn' in e ? e.instructionFn(r, n, F, N) : r) ? ' ' + r : '') +
					'?>');
	}
	function jt(t, e) {
		return e.ignoreComment
			? ''
			: '\x3c!--' + ('commentFn' in e ? e.commentFn(t, F, N) : t) + '--\x3e';
	}
	function Pt(t, e) {
		return e.ignoreCdata
			? ''
			: '<![CDATA[' +
					('cdataFn' in e ? e.cdataFn(t, F, N) : t.replace(']]>', ']]]]><![CDATA[>')) +
					']]>';
	}
	function Rt(t, e) {
		return e.ignoreDoctype
			? ''
			: '<!DOCTYPE ' + ('doctypeFn' in e ? e.doctypeFn(t, F, N) : t) + '>';
	}
	function kt(t, e) {
		return e.ignoreText
			? ''
			: ((t = (t = (t = '' + t).replace(/&amp;/g, '&'))
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')),
			  'textFn' in e ? e.textFn(t, F, N) : t);
	}
	function Mt(t, e, r) {
		F = (N = t).name;
		var n = [],
			a = 'elementNameFn' in e ? e.elementNameFn(t.name, t) : t.name,
			i =
				(n.push('<' + a),
				t[e.attributesKey] && n.push(Gt(t[e.attributesKey], e, r)),
				(t[e.elementsKey] && t[e.elementsKey].length) ||
					(t[e.attributesKey] && 'preserve' === t[e.attributesKey]['xml:space']));
		return (
			(i =
				i ||
				('fullTagEmptyElementFn' in e ? e.fullTagEmptyElementFn(t.name, t) : e.fullTagEmptyElement))
				? (n.push('>'),
				  t[e.elementsKey] &&
						t[e.elementsKey].length &&
						(n.push(It(t[e.elementsKey], e, r + 1)), (F = (N = t).name)),
				  n.push(
						e.spaces &&
							(function (t, e) {
								var r;
								if (t.elements && t.elements.length)
									for (r = 0; r < t.elements.length; ++r)
										switch (t.elements[r][e.typeKey]) {
											case 'text':
												if (e.indentText) return 1;
												break;
											case 'cdata':
												if (e.indentCdata) return 1;
												break;
											case 'instruction':
												if (e.indentInstruction) return 1;
												break;
											default:
												return 1;
										}
							})(t, e)
							? '\n' + Array(r + 1).join(e.spaces)
							: '',
				  ),
				  n.push('</' + a + '>'))
				: n.push('/>'),
			n.join('')
		);
	}
	function It(t, a, i, o) {
		return t.reduce(function (t, e) {
			var r = P(a, i, o && !t);
			switch (e.type) {
				case 'element':
					return t + r + Mt(e, a, i);
				case 'comment':
					return t + r + jt(e[a.commentKey], a);
				case 'doctype':
					return t + r + Rt(e[a.doctypeKey], a);
				case 'cdata':
					return t + (a.indentCdata ? r : '') + Pt(e[a.cdataKey], a);
				case 'text':
					return t + (a.indentText ? r : '') + kt(e[a.textKey], a);
				case 'instruction':
					var n = {};
					return (
						(n[e[a.nameKey]] = e[a.attributesKey] ? e : e[a.instructionKey]),
						t + (a.indentInstruction ? r : '') + Ft(n, a, i)
					);
			}
		}, '');
	}
	function xt(t, e, r) {
		for (var n in t)
			if (t.hasOwnProperty(n))
				switch (n) {
					case e.parentKey:
					case e.attributesKey:
						break;
					case e.textKey:
						if (e.indentText || r) return !0;
						break;
					case e.cdataKey:
						if (e.indentCdata || r) return !0;
						break;
					case e.instructionKey:
						if (e.indentInstruction || r) return !0;
						break;
					case e.doctypeKey:
					case e.commentKey:
					default:
						return !0;
				}
		return !1;
	}
	function Bt(t, e, r, n) {
		var a,
			i,
			o,
			s = [];
		for (i in t)
			if (t.hasOwnProperty(i))
				for (o = St(t[i]) ? t[i] : [t[i]], a = 0; a < o.length; ++a) {
					switch (i) {
						case e.declarationKey:
							s.push(Nt(o[a], e, r));
							break;
						case e.instructionKey:
							s.push((e.indentInstruction ? P(e, r, n) : '') + Ft(o[a], e, r));
							break;
						case e.attributesKey:
						case e.parentKey:
							break;
						case e.textKey:
							s.push((e.indentText ? P(e, r, n) : '') + kt(o[a], e));
							break;
						case e.cdataKey:
							s.push((e.indentCdata ? P(e, r, n) : '') + Pt(o[a], e));
							break;
						case e.doctypeKey:
							s.push(P(e, r, n) + Rt(o[a], e));
							break;
						case e.commentKey:
							s.push(P(e, r, n) + jt(o[a], e));
							break;
						default:
							s.push(
								P(e, r, n) +
									(function (t, e, r, n, a) {
										(N = t), (F = e);
										var i = 'elementNameFn' in r ? r.elementNameFn(e, t) : e;
										if (null == t || '' === t)
											return ('fullTagEmptyElementFn' in r && r.fullTagEmptyElementFn(e, t)) ||
												r.fullTagEmptyElement
												? '<' + i + '></' + i + '>'
												: '<' + i + '/>';
										var o = [];
										if (e) {
											if ((o.push('<' + i), 'object' != typeof t))
												return o.push('>' + kt(t, r) + '</' + i + '>'), o.join('');
											t[r.attributesKey] && o.push(Gt(t[r.attributesKey], r, n));
											var s =
												xt(t, r, !0) ||
												(t[r.attributesKey] && 'preserve' === t[r.attributesKey]['xml:space']);
											if (
												!(s =
													s ||
													('fullTagEmptyElementFn' in r
														? r.fullTagEmptyElementFn(e, t)
														: r.fullTagEmptyElement))
											)
												return o.push('/>'), o.join('');
											o.push('>');
										}
										return (
											o.push(Bt(t, r, n + 1, !1)),
											(N = t),
											(F = e) && o.push((a ? P(r, n, !1) : '') + '</' + i + '>'),
											o.join('')
										);
									})(o[a], i, e, r, xt(o[a], e)),
							);
					}
					n = n && !s.length;
				}
		return s.join('');
	}
	function Ut(t, e) {
		(r = e),
			(r = j.copyOptions(r)),
			j.ensureFlagExists('ignoreDeclaration', r),
			j.ensureFlagExists('ignoreInstruction', r),
			j.ensureFlagExists('ignoreAttributes', r),
			j.ensureFlagExists('ignoreText', r),
			j.ensureFlagExists('ignoreComment', r),
			j.ensureFlagExists('ignoreCdata', r),
			j.ensureFlagExists('ignoreDoctype', r),
			j.ensureFlagExists('compact', r),
			j.ensureFlagExists('indentText', r),
			j.ensureFlagExists('indentCdata', r),
			j.ensureFlagExists('indentAttributes', r),
			j.ensureFlagExists('indentInstruction', r),
			j.ensureFlagExists('fullTagEmptyElement', r),
			j.ensureFlagExists('noQuotesForNativeAttributes', r),
			j.ensureSpacesExists(r),
			'number' == typeof r.spaces && (r.spaces = Array(r.spaces + 1).join(' ')),
			j.ensureKeyExists('declaration', r),
			j.ensureKeyExists('instruction', r),
			j.ensureKeyExists('attributes', r),
			j.ensureKeyExists('text', r),
			j.ensureKeyExists('comment', r),
			j.ensureKeyExists('cdata', r),
			j.ensureKeyExists('doctype', r),
			j.ensureKeyExists('type', r),
			j.ensureKeyExists('name', r),
			j.ensureKeyExists('elements', r);
		var r,
			n = [];
		return (
			(N = t),
			(F = '_root_'),
			(e = r).compact
				? n.push(Bt(t, e, 0, !0))
				: (t[e.declarationKey] && n.push(Nt(t[e.declarationKey], e, 0)),
				  t[e.elementsKey] &&
						t[e.elementsKey].length &&
						n.push(It(t[e.elementsKey], e, 0, !n.length))),
			n.join('')
		);
	}
	var Kt,
		zt = Ut,
		Wt = {
			xml2js: Ct,
			xml2json: function (t, e) {
				var r;
				return (
					(e = e),
					(e = Lt.copyOptions(e)),
					Lt.ensureSpacesExists(e),
					(e = Ot(t, (t = e))),
					(r = 'compact' in t && t.compact ? '_parent' : 'parent'),
					('addParent' in t && t.addParent
						? JSON.stringify(
								e,
								function (t, e) {
									return t === r ? '_' : e;
								},
								t.spaces,
						  )
						: JSON.stringify(e, null, t.spaces)
					)
						.replace(/\u2028/g, '\\u2028')
						.replace(/\u2029/g, '\\u2029')
				);
			},
			js2xml: Ut,
			json2xml: function (t, e) {
				var r = null;
				if ('string' == typeof (t = t instanceof Buffer ? t.toString() : t))
					try {
						r = JSON.parse(t);
					} catch (t) {
						throw new Error('The JSON structure is invalid');
					}
				else r = t;
				return zt(r, e);
			},
		},
		R = { raster: {}, vector: {} };
	function Yt(t) {
		if (t) {
			t = Wt.xml2js(t);
			if (
				t.elements &&
				0 < t.elements.length &&
				(1 !== t.elements.length && console.warn('invalid xml!'),
				t.elements[0] && t.elements[0].elements)
			)
				return t.elements[0].elements.map(function (t) {
					var e = t.attributes;
					return (
						t.elements &&
							0 < t.elements.length &&
							(e.options = t.elements.map(function (t) {
								return t.elements[0].text;
							})),
						e
					);
				});
		}
		return null;
	}
	function Vt() {
		for (var t, e, r, n = g.GDALGetDriverCount(), a = 0; a < n; a += 1) {
			var i = g.GDALGetDriver(a),
				o =
					((i = i),
					(r = e = o = t = void 0),
					(t = g.GDALGetMetadataItem(i, 'DMD_EXTENSIONS', null)),
					'' !==
						(o =
							'' === (o = g.GDALGetMetadataItem(i, 'DMD_EXTENSION', null)) && '' !== t
								? t.split(' ')[0]
								: o) && (o = o.replace('.', '').replace('/', '')),
					'GeoJSON' === (e = g.GDALGetDescription(i)) && (o = 'geojson'),
					(r = g.GDALGetMetadataItem(i, 'DMD_LONGNAME', null)),
					{
						extension: o,
						extensions: t,
						shortName: e,
						longName: r,
						isReadable: 'YES' === g.GDALGetMetadataItem(i, 'DCAP_OPEN', null),
						isWritable:
							'YES' === g.GDALGetMetadataItem(i, 'DCAP_CREATE', null) ||
							'YES' === g.GDALGetMetadataItem(i, 'DCAP_CREATECOPY', null),
						isRaster: 'YES' === g.GDALGetMetadataItem(i, 'DCAP_RASTER', null),
						isVector: 'YES' === g.GDALGetMetadataItem(i, 'DCAP_VECTOR', null),
						openOptionsList: Yt(g.GDALGetMetadataItem(i, 'DMD_OPENOPTIONLIST', null)),
						creationOptionList: Yt(g.GDALGetMetadataItem(i, 'DMD_CREATIONOPTIONLIST', null)),
						layerCreationOptionList: Yt(
							g.GDALGetMetadataItem(i, 'DS_LAYER_CREATIONOPTIONLIST', null),
						),
						helpUrl: g.GDALGetMetadataItem(i, 'DMD_HELPTOPIC', null),
					});
			o.isRaster && (R.raster[o.shortName] = s(s({ index: a }, o), {}, { type: 'raster' })),
				o.isVector && (R.vector[o.shortName] = s(s({ index: a }, o), {}, { type: 'vector' }));
		}
	}
	function Ht() {
		(!i && 'function' != typeof importScripts) || g.Module.FS.unmount(p);
	}
	var Xt = {
		ogr2ogr: function (u) {
			var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
			return new Promise(function (t, e) {
				var r = E(c),
					n = r.config,
					n =
						(Object.entries(n).forEach(function (t) {
							var t = M(t, 2),
								e = t[0],
								t = t[1];
							g.CPLSetConfigOption(e, t);
						}),
						g.GDALVectorTranslateOptionsNew(r.ptr, null)),
					a = g.Module._malloc(4),
					i = (g.Module.setValue(a, u.pointer, '*'), c.indexOf('-f') + 1),
					o = 'unknown',
					i =
						(0 !== i &&
							((i = c[i]),
							(s = R.vector[i]) &&
								(o = 'MapInfo File' === i && -1 !== c.indexOf('FORMAT=MIF') ? 'mif' : s.extension)),
						u.path.split('.', 1)[0]),
					s = ''.concat(m, '/').concat(i, '.').concat(o),
					a = g.GDALVectorTranslate(s, null, 1, a, n, null);
				g.GDALVectorTranslateOptionsFree(n),
					w(r),
					g.GDALClose(a),
					0 !== g.CPLGetLastErrorNo()
						? e(d())
						: t({ local: s, real: ''.concat(l, '/').concat(i, '.').concat(o) });
			});
		},
		gdal_translate: function (u) {
			var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
			return new Promise(function (t, e) {
				var r = E(c),
					n = r.config,
					n =
						(Object.entries(n).forEach(function (t) {
							var t = M(t, 2),
								e = t[0],
								t = t[1];
							g.CPLSetConfigOption(e, t);
						}),
						g.GDALTranslateOptionsNew(r.ptr, null)),
					a = c.indexOf('-of') + 1,
					i = 'unknown',
					a =
						(0 !== a && ((a = c[a]), (a = R.raster[a]) && (i = a.extension)),
						u.path.split('.', 1)[0]),
					o = ''.concat(m, '/').concat(a, '.').concat(i),
					s = g.GDALTranslate(o, u.pointer, n, null);
				g.GDALTranslateOptionsFree(n),
					w(r),
					g.GDALClose(s),
					0 !== g.CPLGetLastErrorNo()
						? e(d())
						: t({ local: o, real: ''.concat(l, '/').concat(a, '.').concat(i) });
			});
		},
		gdal_rasterize: function (u) {
			var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
			return new Promise(function (t, e) {
				var r = E(c),
					n = r.config,
					n =
						(Object.entries(n).forEach(function (t) {
							var t = M(t, 2),
								e = t[0],
								t = t[1];
							g.CPLSetConfigOption(e, t);
						}),
						g.GDALRasterizeOptionsNew(r.ptr, null)),
					a = c.indexOf('-of') + 1,
					i = 'tif',
					a =
						(0 !== a && ((a = c[a]), (a = R.raster[a]) && (i = a.extension)),
						u.path.split('.', 1)[0]),
					o = ''.concat(m, '/').concat(a, '.').concat(i),
					s = g.GDALRasterize(o, null, u.pointer, n, null);
				g.GDALRasterizeOptionsFree(n),
					w(r),
					g.GDALClose(s),
					0 !== g.CPLGetLastErrorNo()
						? e(d())
						: t({ local: o, real: ''.concat(l, '/').concat(a, '.').concat(i) });
			});
		},
		gdalwarp: function (u) {
			var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
			return new Promise(function (t, e) {
				var r = E(c),
					n = r.config,
					n =
						(Object.entries(n).forEach(function (t) {
							var t = M(t, 2),
								e = t[0],
								t = t[1];
							g.CPLSetConfigOption(e, t);
						}),
						g.GDALWarpAppOptionsNew(r.ptr, null)),
					a = g.Module._malloc(4),
					i = (g.Module.setValue(a, u.pointer, '*'), c.indexOf('-of') + 1),
					o = 'unknown',
					i =
						(0 !== i && ((i = c[i]), (i = R.raster[i]) && (o = i.extension)),
						u.path.split('.', 1)[0]),
					s = ''.concat(m, '/').concat(i, '.').concat(o),
					a = g.GDALWarp(s, null, 1, a, n, null);
				g.GDALWarpAppOptionsFree(n),
					w(r),
					g.GDALClose(a),
					0 !== g.CPLGetLastErrorNo()
						? e(d())
						: t({ local: s, real: ''.concat(l, '/').concat(i, '.').concat(o) });
			});
		},
		gdaltransform: function (y, _) {
			return new Promise(function (t) {
				for (
					var e = new Float64Array(
							y.map(function (t) {
								return t[0];
							}),
						),
						r = new Float64Array(
							y.map(function (t) {
								return t[1];
							}),
						),
						n = new Float64Array(
							y.map(function (t) {
								return t[2] || 0;
							}),
						),
						a = g.Module._malloc(e.length * e.BYTES_PER_ELEMENT),
						i = g.Module._malloc(r.length * r.BYTES_PER_ELEMENT),
						o = g.Module._malloc(n.length * n.BYTES_PER_ELEMENT),
						s =
							(g.Module.HEAPF64.set(e, a / e.BYTES_PER_ELEMENT),
							g.Module.HEAPF64.set(r, i / r.BYTES_PER_ELEMENT),
							g.Module.HEAPF64.set(n, o / n.BYTES_PER_ELEMENT),
							!1),
						u = !1,
						c = [],
						l = 0;
					l < _.length;
					l += 1
				)
					switch (_[l]) {
						case '-s_srs':
							(l += 1), c.push('SRC_SRS='.concat(_[l]));
							break;
						case '-t_srs':
							(l += 1), c.push('DST_SRS='.concat(_[l]));
							break;
						case '-ct':
							(l += 1), c.push('COORDINATE_OPERATION='.concat(_[l]));
							break;
						case '-order':
							(l += 1), c.push('MAX_GCP_ORDER='.concat(_[l]));
							break;
						case '-tps':
							c.push('METHOD=GCP_TPS');
							break;
						case '-rpc':
							c.push('METHOD=RPC');
							break;
						case '-geoloc':
							c.push('METHOD=GEOLOC_ARRAY');
							break;
						case '-i':
							s = !0;
							break;
						case '-to':
							(l += 1), c.push(''.concat(_[l]));
							break;
						case '-output_xy':
							u = !0;
					}
				for (
					var f = E(c),
						d = g.GDALCreateGenImgProjTransformer2(null, null, f.ptr),
						p =
							(g.GDALGenImgProjTransform(d, s, y.length, a, i, o, null),
							[
								Array.from(
									g.Module.HEAPF64.subarray(
										a / e.BYTES_PER_ELEMENT,
										a / e.BYTES_PER_ELEMENT + e.length,
									),
								),
								Array.from(
									g.Module.HEAPF64.subarray(
										i / r.BYTES_PER_ELEMENT,
										i / r.BYTES_PER_ELEMENT + r.length,
									),
								),
								Array.from(
									g.Module.HEAPF64.subarray(
										o / n.BYTES_PER_ELEMENT,
										o / n.BYTES_PER_ELEMENT + n.length,
									),
								),
							]),
						m = [],
						h = 0;
					h < p[0].length;
					h += 1
				)
					u ? m.push([p[0][h], p[1][h]]) : m.push([p[0][h], p[1][h], p[2][h]]);
				g.Module._free(a),
					g.Module._free(i),
					g.Module._free(o),
					w(f),
					g.GDALDestroyGenImgProjTransformer(d),
					t(m);
			});
		},
		open: function (t) {
			var r = t,
				f = E(1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : []);
			return (
				Array.isArray(r) || ('function' == typeof FileList && r instanceof FileList) || (r = [r]),
				new Promise(function (u, c) {
					var a,
						l = [],
						e = [];
					I(r).forEach(function (t) {
						!('string' == typeof t || t instanceof String) ||
						(t.substr(0, p.length + 1) !== ''.concat(p, '/') &&
							t.substr(0, m.length + 1) !== ''.concat(m, '/'))
							? e.push(t)
							: l.push({ name: t.substr(m.length + 1), internal: !0 });
					}),
						(a = e),
						new Promise(function (e) {
							var r, n;
							0 === a.length
								? e([])
								: i
								? ((r = []),
								  a.forEach(function (t) {
										var t = t.split('/'),
											e = t.pop(),
											t = t.join('/') || '.';
										Kt !== t &&
											(Kt && Ht(), (Kt = t), g.Module.FS.mount(g.Module.NODEFS, { root: t }, p)),
											r.push({ name: e });
								  }),
								  e(r))
								: 'function' == typeof importScripts
								? (Kt && Ht(),
								  g.Module.FS.mount(g.Module.WORKERFS, { files: a }, p),
								  (Kt = !0),
								  e(a))
								: ((n = []),
								  a.forEach(function (t) {
										n.push(t.arrayBuffer());
								  }),
								  Promise.all(n).then(function (t) {
										t.forEach(function (t, e) {
											t = new Uint8Array(t);
											g.Module.FS.writeFile(''.concat(p, '/').concat(a[e].name), t);
										}),
											e(a);
								  }));
						}).then(function (t) {
							for (
								var e = [].concat(I(t), l), r = [], n = (g.CPLErrorReset(), {}), a = 0;
								a < e.length;
								a += 1
							) {
								var i,
									o = e[a].name,
									s = o.split('.', 1)[0];
								n[s] || (n[s] = {}),
									n[s].pointer ||
										((n[s].path = o),
										(i = ''.concat(p, '/').concat(o)),
										e[a].internal && (i = ''.concat(m, '/').concat(o)),
										(o = g.GDALOpenEx(i, null, null, f.ptr, null)),
										0 !== g.CPLGetLastErrorNo() || 0 === o
											? ((i = d()), r.push(i), delete n[s])
											: ((n[s].pointer = o),
											  (i = g.GDALGetRasterCount(o)),
											  (o = g.GDALDatasetGetLayerCount(o)),
											  (n[s].type = 0 < i && 0 === o ? 'raster' : 'vector')));
							}
							w(f);
							t = Object.values(n);
							0 < t.length || 0 === r.length ? u({ datasets: t, errors: r }) : c(r);
						});
				})
			);
		},
		close: function (e) {
			return new Promise(function (t) {
				g.GDALClose(e.pointer), t();
			});
		},
		getInfo: function (m) {
			return new Promise(function (t) {
				var e = g.GDALGetRasterCount(m.pointer),
					r = g.GDALDatasetGetLayerCount(m.pointer);
				if (0 < e && 0 === r) {
					var n = g.GDALGetRasterXSize(m.pointer),
						a = g.GDALGetRasterYSize(m.pointer),
						i = g.GDALGetProjectionRef(m.pointer),
						o = g.Module._malloc(6 * Float64Array.BYTES_PER_ELEMENT),
						s =
							(g.GDALGetGeoTransform(m.pointer, o),
							g.Module.HEAPF64.subarray(
								o / Float64Array.BYTES_PER_ELEMENT,
								o / Float64Array.BYTES_PER_ELEMENT + 6,
							)),
						o = [
							[0, 0],
							[n, 0],
							[n, a],
							[0, a],
						].map(function (t) {
							var e = t[0],
								t = t[1];
							return [s[0] + s[1] * e + s[2] * t, s[3] + s[4] * e + s[5] * t];
						}),
						u = g.GDALGetDatasetDriver(m.pointer),
						u = g.GDALGetDriverLongName(u),
						c = g.OGR_DS_GetName(m.pointer);
					t(
						JSON.parse(
							JSON.stringify({
								type: 'raster',
								bandCount: e,
								width: n,
								height: a,
								projectionWkt: i,
								coordinateTransform: s,
								corners: o,
								driverName: u,
								dsName: c,
							}),
						),
					);
				} else {
					for (var l = [], f = 0; f < r; f += 1) {
						var d = g.OGR_DS_GetLayer(m.pointer, f),
							p = g.OGR_L_GetName(d),
							d = g.OGR_L_GetFeatureCount(d, 1);
						l.push({ name: p, featureCount: d });
					}
					(e = l.reduce(function (t, e) {
						return t + e.featureCount;
					}, 0)),
						(n = g.OGR_DS_GetName(m.pointer)),
						(a = g.GDALGetDatasetDriver(m.pointer));
					t({
						type: 'vector',
						layerCount: r,
						featureCount: e,
						layers: l,
						dsName: n,
						driverName: g.GDALGetDriverLongName(a),
					});
				}
			});
		},
		getOutputFiles: function () {
			return new Promise(function (t) {
				t(
					(function r(t) {
						var n = 0 < arguments.length && void 0 !== t ? t : m.substr(1),
							a = n.split('/').reduce(function (t, e) {
								return t.contents[e];
							}, g.Module.FS.root).contents,
							i = [];
						return (
							Object.keys(a).forEach(function (t) {
								var e = a[t];
								e.usedBytes
									? i.push({ path: '/'.concat(n, '/').concat(t), size: e.usedBytes })
									: e.contents && i.push.apply(i, I(r(''.concat(n, '/').concat(t))));
							}),
							i
						);
					})(),
				);
			});
		},
		getFileBytes: function (r) {
			return new Promise(function (t) {
				var e;
				r
					? ((e = r.local || r), t(g.Module.FS.readFile(e, { encoding: 'binary' })))
					: t(new Uint8Array());
			});
		},
		drivers: R,
	};
	function qt(r) {
		var n;
		onmessage = function (t) {
			var e;
			return t.data && 'constructor' === t.data.func
				? ((e = { useWorker: !1 }),
				  t.data.params && t.data.params.config && (e = s(s({}, t.data.params.config), e)),
				  (n = r(e))
						.then(function (t) {
							t = t.drivers;
							return postMessage({ success: !0, id: 'onload', data: t });
						})
						.catch(function (t) {
							return postMessage({ success: !1, id: 'onload', data: t });
						}),
				  null)
				: n
						.then(
							function (t) {
								var e = this;
								this.data && this.data.func && t[this.data.func]
									? t[this.data.func]
											.apply(t, I(this.data.params))
											.then(function (t) {
												postMessage({ success: !0, id: e.data.id, data: t });
											})
											.catch(function (t) {
												postMessage({ success: !1, id: e.data.id, data: { message: t.message } });
											})
									: console.error('undefined function', this.data);
							}.bind(t),
						)
						.catch(
							function (t) {
								postMessage({ success: !1, id: this.id, data: { no: -1, message: t.message } });
							}.bind(t),
						);
		};
	}
	var Qt,
		Zt = { gdalWorkerWrapper: null, drivers: null },
		U = (function () {
			function a(t, e, r) {
				var n = this;
				if (!(this instanceof a)) throw new TypeError('Cannot call a class as a function');
				(this.promises = { onload: { resolve: r, reject: console.error } }),
					(this.gdalWorker = new Worker(t)),
					(this.gdalWorker.onmessage = function (t) {
						t.data &&
							t.data.id &&
							n.promises[t.data.id] &&
							(t.data.success
								? n.promises[t.data.id].resolve(t.data.data)
								: n.promises[t.data.id].reject(t.data.data));
					}),
					this.gdalWorker.postMessage({ func: 'constructor', params: { config: e } });
			}
			var t, e, r;
			return (
				(t = a),
				(e = [
					{
						key: 'call',
						value: function (r) {
							var n = this;
							return new Promise(function (t, e) {
								(r.id = Math.floor(1e5 * Math.random())),
									(n.promises[r.id] = { resolve: t, reject: e }),
									n.gdalWorker.postMessage(r);
							});
						},
					},
					{
						key: 'terminate',
						value: function () {
							this.gdalWorker.terminate(), delete this.gdalWorker, delete this.promises;
						},
					},
				]) && k(t.prototype, e),
				r && k(t, r),
				Object.defineProperty(t, 'prototype', { writable: !1 }),
				a
			);
		})(),
		mt = new Proxy(
			{},
			{
				get: function (t, a) {
					return 'then' === a || 'catch' === a
						? t
						: 'drivers' === a
						? Zt.drivers
						: function () {
								for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
									n[e] = arguments[e];
								return new Promise(function (e, r) {
									Zt.gdalWorkerWrapper
										.call({ func: a, params: n })
										.then(function (t) {
											e(t);
										})
										.catch(function (t) {
											return r(t);
										});
								});
						  };
				},
			},
		),
		Jt = { variables: Zt, WorkerWrapper: U, gdalProxy: mt };
	function $t() {
		var t,
			r,
			a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
		return (Qt =
			Qt ||
			(i || !1 === a.useWorker
				? new Promise(function (t, e) {
						var r = g.Module,
							n = r.onAbort;
						(r.onAbort = function (t) {
							e(new Error(t)), n && n(t);
						}),
							(r.print = function (t) {
								console.debug('gdal stdout: '.concat(t));
							}),
							(r.printErr = function (t) {
								console.error('gdal stderr: '.concat(t));
							}),
							(r.preRun = [
								function (t) {
									t = t.ENV;
									(t.PROJ_LIB = '/usr/share/proj'),
										(t.GDAL_DATA = '/usr/share/gdal'),
										(t.DXF_FEATURE_LIMIT_PER_BLOCK = '-1'),
										(t.GDAL_NUM_THREADS = '0'),
										(t.GDAL_ENABLE_DEPRECATED_DRIVER_GTM = 'YES'),
										(t.CPL_LOG_ERRORS = 'ON');
								},
							]),
							(r.onRuntimeInitialized = function () {
								var t, e;
								g.GDALOpen ||
									((e = g.Module).ccall('GDALAllRegister', null, [], []),
									(g.GDALOpen = e.cwrap('GDALOpen', 'number', ['string'])),
									(g.GDALOpenEx = e.cwrap('GDALOpenEx', 'number', [
										'string',
										'number',
										'number',
										'number',
										'number',
									])),
									(g.GDALClose = e.cwrap('GDALClose', null, ['number'])),
									(g.CPLErrorReset = e.cwrap('CPLErrorReset', null, [])),
									(g.CPLSetErrorHandler = e.cwrap('CPLSetErrorHandler', 'number', ['number'])),
									(g.CPLQuietErrorHandler = e.cwrap('CPLQuietErrorHandler', null, [
										'number',
										'number',
										'string',
									])),
									(g.CPLGetLastErrorNo = e.cwrap('CPLGetLastErrorNo', 'number', [])),
									(g.CPLGetLastErrorMsg = e.cwrap('CPLGetLastErrorMsg', 'string', [])),
									(g.CPLGetLastErrorType = e.cwrap('CPLGetLastErrorType', 'number', [])),
									(g.CPLSetConfigOption = e.cwrap('CPLSetConfigOption', null, [
										'string',
										'string',
									])),
									(g.CPLSetThreadLocalConfigOption = e.cwrap(
										'CPLSetThreadLocalConfigOption',
										null,
										['string', 'string'],
									)),
									(g.GDALGetRasterCount = e.cwrap('GDALGetRasterCount', 'number', ['number'])),
									(g.GDALGetRasterXSize = e.cwrap('GDALGetRasterXSize', 'number', ['number'])),
									(g.GDALGetRasterYSize = e.cwrap('GDALGetRasterYSize', 'number', ['number'])),
									(g.GDALGetProjectionRef = e.cwrap('GDALGetProjectionRef', 'string', ['number'])),
									(g.GDALGetGeoTransform = e.cwrap('GDALGetGeoTransform', 'number', [
										'number',
										'number',
									])),
									(g.GDALVectorTranslate = e.cwrap('GDALVectorTranslate', 'number', [
										'string',
										'number',
										'number',
										'number',
										'number',
										'number',
									])),
									(g.GDALVectorTranslateOptionsNew = e.cwrap(
										'GDALVectorTranslateOptionsNew',
										'number',
										['number', 'number'],
									)),
									(g.GDALVectorTranslateOptionsFree = e.cwrap(
										'GDALVectorTranslateOptionsFree',
										'number',
										['number'],
									)),
									(g.GDALDatasetGetLayerCount = e.cwrap('GDALDatasetGetLayerCount', 'number', [
										'number',
									])),
									(g.GDALDatasetGetLayer = e.cwrap('GDALDatasetGetLayer', 'number', [
										'number',
										'number',
									])),
									(g.OGR_DS_GetLayerCount = e.cwrap('OGR_DS_GetLayerCount', 'number', ['number'])),
									(g.OGR_DS_GetName = e.cwrap('OGR_DS_GetName', 'string', ['number'])),
									(g.OGR_DS_GetLayer = e.cwrap('OGR_DS_GetLayer', 'number', ['number', 'number'])),
									(g.OGR_L_GetName = e.cwrap('OGR_L_GetName', 'string', ['number'])),
									(g.OGR_DS_GetDriver = e.cwrap('OGR_DS_GetDriver', 'number', ['number'])),
									(g.OGR_Dr_GetName = e.cwrap('OGR_Dr_GetName', 'string', ['number'])),
									(g.GDALGetDatasetDriver = e.cwrap('GDALGetDatasetDriver', 'number', ['number'])),
									(g.GDALGetDriverLongName = e.cwrap('GDALGetDriverLongName', 'string', [
										'number',
									])),
									(g.GDALGetDriverShortName = e.cwrap('GDALGetDriverShortName', 'string', [
										'number',
									])),
									(g.GDALTranslate = e.cwrap('GDALTranslate', 'number', [
										'string',
										'number',
										'number',
										'number',
									])),
									(g.GDALTranslateOptionsNew = e.cwrap('GDALTranslateOptionsNew', 'number', [
										'number',
										'number',
									])),
									(g.GDALTranslateOptionsFree = e.cwrap('GDALTranslateOptionsFree', 'number', [
										'number',
									])),
									(g.GDALRasterize = e.cwrap('GDALRasterize', 'number', [
										'string',
										'number',
										'number',
										'number',
										'number',
									])),
									(g.GDALRasterizeOptionsNew = e.cwrap('GDALRasterizeOptionsNew', 'number', [
										'number',
										'number',
									])),
									(g.GDALRasterizeOptionsFree = e.cwrap('GDALRasterizeOptionsFree', 'number', [
										'number',
									])),
									(g.GDALWarp = e.cwrap('GDALWarp', 'number', [
										'string',
										'number',
										'number',
										'number',
										'number',
										'number',
									])),
									(g.GDALWarpAppOptionsNew = e.cwrap('GDALWarpAppOptionsNew', 'number', [
										'number',
										'number',
									])),
									(g.GDALWarpAppOptionsSetProgress = e.cwrap(
										'GDALWarpAppOptionsSetProgress',
										'number',
										['number', 'number', 'number'],
									)),
									(g.GDALWarpAppOptionsFree = e.cwrap('GDALWarpAppOptionsFree', 'number', [
										'number',
									])),
									(g.OSRNewSpatialReference = e.cwrap('OSRNewSpatialReference', 'number', [
										'string',
									])),
									(g.OSRDestroySpatialReference = e.cwrap('OSRDestroySpatialReference', 'number', [
										'number',
									])),
									(g.OCTNewCoordinateTransformation = e.cwrap(
										'OCTNewCoordinateTransformation',
										'number',
										['number', 'number'],
									)),
									(g.OCTDestroyCoordinateTransformation = e.cwrap(
										'OCTDestroyCoordinateTransformation',
										'number',
										['number'],
									)),
									(g.OCTTransform = e.cwrap('OCTTransform', 'number', [
										'number',
										'number',
										'number',
										'number',
										'number',
									])),
									(g.GDALGetDriverCount = e.cwrap('GDALGetDriverCount', 'number', [])),
									(g.OGRGetDriverCount = e.cwrap('OGRGetDriverCount', 'number', [])),
									(g.GDALGetDriver = e.cwrap('GDALGetDriver', 'number', ['number'])),
									(g.OGRGetDriver = e.cwrap('OGRGetDriver', 'number', ['number'])),
									(g.GDALGetMetadataItem = e.cwrap('GDALGetMetadataItem', 'string', [
										'number',
										'string',
										'string',
									])),
									(g.GDALGetDescription = e.cwrap('GDALGetDescription', 'string', ['number'])),
									(g.OGR_L_GetFeatureCount = e.cwrap('OGR_L_GetFeatureCount', 'number', [
										'number',
										'number',
									])),
									(g.GDALGenImgProjTransform = e.cwrap('GDALGenImgProjTransform', 'number', [
										'number',
										'number',
										'number',
										'number',
										'number',
										'number',
										'number',
									])),
									(g.GDALCreateGenImgProjTransformer2 = e.cwrap(
										'GDALCreateGenImgProjTransformer2',
										'number',
										['number', 'number', 'number'],
									)),
									(g.GDALDestroyGenImgProjTransformer = e.cwrap(
										'GDALDestroyGenImgProjTransformer',
										null,
										['number'],
									)),
									(g.OSRSetFromUserInput = e.cwrap('OSRSetFromUserInput', 'number', [
										'number',
										'string',
									]))),
									r.FS.mkdir(p),
									r.FS.mkdir(m),
									a.dest &&
										((e = a.dest),
										(l = e),
										(t = a.dest),
										i && g.Module.FS.mount(g.Module.NODEFS, { root: t }, m)),
									Vt();
							}),
							(r.locateFile = function (t) {
								var e = t,
									t =
										(a.paths && a.paths.wasm && 'wasm' === t.split('.').pop()
											? (e = a.paths.wasm)
											: a.paths &&
											  a.paths.data &&
											  'data' === t.split('.').pop() &&
											  (e = a.paths.data),
										''),
									t =
										(a.path
											? '/' !== (t = a.path).slice(-1) && (t += '/')
											: i && (t = 'node_modules/gdal3.js/dist/package/'),
										t + e);
								return (t = i || 'http' === t.substring(0, 4) || '/' === t[0] ? t : '/'.concat(t));
							}),
							i &&
								(r.getPreloadedPackage = function (t) {
									return xr.readFileSync('./'.concat(t), { flag: 'r' }).buffer;
								}),
							z(g.Module).then(function () {
								t(Xt);
							});
				  })
				: ((t = (a.paths && a.paths.js) || 'gdal3.js'),
				  (r = ''),
				  a.path && '/' !== (r = a.path).slice(-1) && (r += '/'),
				  new Promise(function (e) {
						Jt.variables.gdalWorkerWrapper = new Jt.WorkerWrapper(
							''.concat(r).concat(t),
							a,
							function (t) {
								(Jt.variables.drivers = t), e(Jt.gdalProxy);
							},
						);
				  }))));
	}
	return (
		i && (global.location = { pathname: './' }),
		'undefined' != typeof window && (window.initGdalJs = $t),
		'function' == typeof importScripts && qt($t),
		$t
	);
});

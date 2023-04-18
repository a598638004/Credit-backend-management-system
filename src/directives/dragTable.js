export default {
	name: 'drag',
	handler: {
		unbind: function (el) {
			let target = el.getElementsByClassName('el-table__body-wrapper')[0];
			target.onmousedown = null;
		},
		/* 
		* @params el 元素 binding 修饰符与数据等  vnode当前元素的虚拟node
		*/
		inserted: function (el, binding, vnode) {
			// console.log("我要开始滑动了");
			// 1.隐藏table组件下的横向滚动条
			let target = el.getElementsByClassName('el-table__body-wrapper')[0];
			target.style.overflowX = 'hidden';
			// 2. 显示为小手
			target.style.cursor = 'grab';
			// 鼠标按下，clientX相对于容器的X
			target.onmousedown = function (e) {
				// 获取元素相对于可视窗口的X
				let startPointer = e.clientX;
				// 获取初始的横向滚动值，后续在此基础上加
				let startScrollLeft = target.scrollLeft;
				// 记录document的移动,否则超出元素会有问题
				document.onmousemove = function (e) {
					let x = e.clientX - startPointer;
					target.scrollLeft = startScrollLeft - x;
				}
				// 防止用户超出当前元素，放开鼠标，触发事件
				document.onmouseup = function (e) {
					document.onmouseup = null;
					document.onmousemove = null;
				}
			}
		}
	}
}
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="sidebar" class="sidebar responsive">
	<script type="text/javascript">
		try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
	</script>

	<ul class="nav nav-list">
		<li class="">
			<a href="main/index">
				<i class="menu-icon fa fa-tachometer"></i>
				<span class="menu-text">后台首页</span>
			</a>
			<b class="arrow"></b>
		</li>
		
		<c:forEach items="${menuList}" var="menu1">
			<c:if test="${menu1.hasMenu && '1' == menu1.MENU_STATE}">
				<li class="" id="one${menu1.MENU_ID }">
					<!-- 一级菜单 -->
					<a style="cursor:pointer;" class="dropdown-toggle">
						<i class="${menu1.MENU_ICON == null ? 'menu-icon fa fa-leaf black' : menu1.MENU_ICON}"></i>
						<span class="menu-text">
							${menu1.MENU_NAME }
						</span>
						<c:if test="${'[]' != menu1.subMenu}"><b class="arrow fa fa-angle-down"></b></c:if>
					</a>
					<b class="arrow"></b>
					<!-- 二级菜单 -->
					<c:if test="${'[]' != menu1.subMenu}">
						<ul class="submenu">
							<c:forEach items="${menu1.subMenu}" var="menu2">
								<c:if test="${menu2.hasMenu && '1' == menu2.MENU_STATE}">
								<li class="" id="two${menu2.MENU_ID }">
									<a style="cursor:pointer;" <c:if test="${not empty menu2.MENU_URL && '#' != menu2.MENU_URL}">target="mainFrame" onclick="siMenu('z${menu2.MENU_ID }','lm${menu1.MENU_ID }','${menu2.MENU_NAME }','${menu2.MENU_URL }')"</c:if><c:if test="${'[]' != menu2.subMenu}"> class="dropdown-toggle"</c:if>>
										<i class="${menu2.MENU_ICON == null ? 'menu-icon fa fa-leaf black' : menu2.MENU_ICON}"></i>
											${menu2.MENU_NAME }
										<c:if test="${'[]' != menu2.subMenu}"><b class="arrow fa fa-angle-down"></b></c:if>
									</a>
									<b class="arrow"></b>
									<!-- 三级菜单 -->
									<c:if test="${'[]' != menu2.subMenu}">
									<ul class="submenu">
										<c:forEach items="${menu2.subMenu}" var="menu3">
										<c:if test="${menu3.hasMenu && '1' == menu3.MENU_STATE}">
											<li class="" id="three${menu3.MENU_ID }">
												<a style="cursor:pointer;" <c:if test="${not empty menu3.MENU_URL && '#' != menu3.MENU_URL}">target="mainFrame" onclick="siMenu('m${menu3.MENU_ID }','z${menu2.MENU_ID }','${menu3.MENU_NAME }','${menu3.MENU_URL }')"</c:if><c:if test="${'[]' != menu3.subMenu}"> class="dropdown-toggle"</c:if>>
													<i class="${menu3.MENU_ICON == null ? 'menu-icon fa fa-leaf black' : menu3.MENU_ICON}"></i>
														${menu3.MENU_NAME }
													<c:if test="${'[]' != menu3.subMenu}"><b class="arrow fa fa-angle-down"></b></c:if>
												</a>
												<b class="arrow"></b>
												<!-- 四级菜单 -->
												<c:if test="${'[]' != menu3.subMenu}">
												<ul class="submenu">
													<c:forEach items="${menu3.subMenu}" var="menu4">
													<c:if test="${menu4.hasMenu && '1' == menu4.MENU_STATE}">
													<li class="" id="n${menu4.MENU_ID }">
														<c:if test="${'[]' != menu4.subMenu}">
															<a style="cursor:pointer;" target="mainFrame" target="mainFrame" onclick="siMenu('n${menu4.MENU_ID }','m${menu3.MENU_ID }','${menu4.MENU_NAME }','menu/otherlistMenu.do?MENU_ID=${menu4.MENU_ID }')">
																<i class="${menu4.MENU_ICON == null ? 'menu-icon fa fa-leaf black' : menu4.MENU_ICON}"></i>
																${menu4.MENU_NAME }
															</a>
														</c:if>
														<c:if test="${'[]' == menu4.subMenu}">
															<a style="cursor:pointer;" target="mainFrame" <c:if test="${not empty menu4.MENU_URL && '#' != menu4.MENU_URL}">target="mainFrame" onclick="siMenu('n${menu4.MENU_ID }','m${menu3.MENU_ID }','${menu4.MENU_NAME }','${menu4.MENU_URL }')"</c:if>>
																<i class="${menu4.MENU_ICON == null ? 'menu-icon fa fa-leaf black' : menu4.MENU_ICON}"></i>
																${menu4.MENU_NAME }
															</a>
														</c:if>
														<b class="arrow"></b>
													</li>
													</c:if>
													</c:forEach>
												</ul>
												</c:if>
												
											</li>
											</c:if>
										</c:forEach>
									</ul>
									</c:if>
									
								</li>
								</c:if>
							</c:forEach>
						</ul>
					</c:if>
						
				</li>
			</c:if>
		</c:forEach>

	</ul>

	<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
		<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
	</div>

	<script type="text/javascript">
		try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
	</script>
</div>
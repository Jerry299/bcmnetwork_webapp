import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { ProfileNavBar } from "../Profile/UserProfile";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({ name }) => (
	<Layout>
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={(broken) => {
				console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				console.log(collapsed, type);
			}}
		>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={["4"]}
				items={[
					UserOutlined,
					VideoCameraOutlined,
					UploadOutlined,
					UserOutlined,
				].map((icon, index) => ({
					key: String(index + 1),
					icon: React.createElement(icon),
					label: `nav ${index + 1}`,
				}))}
			/>
		</Sider>
		<Layout>
			<Header
				className="site-layout-sub-header-background"
				style={{
					padding: 0,
				}}
			>
				<ProfileNavBar name={name}/>
			</Header>

			<Content
				style={{
					margin: "24px 16px 0",
				}}
			>
				<div
					className="site-layout-background"
					style={{
						padding: 24,
						minHeight: 360,
					}}
				>
					content
				</div>
			</Content>
			<Footer
				style={{
					textAlign: "center",
				}}
			>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</Layout>
	</Layout>
);

export default AppLayout;

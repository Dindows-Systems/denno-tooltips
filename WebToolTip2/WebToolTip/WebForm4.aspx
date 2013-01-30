<%@ Page Language="vb" AutoEventWireup="false" Codebehind="WebForm4.aspx.vb" Inherits="WebToolTip.WebForm4" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>WebForm4</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Styles.css" rel="stylesheet">
		<script language="javascript">
			 var cssFile
		 if (navigator.appName == 'Microsoft Internet Explorer')
			{
			cssFile = "CursorStyleSheetIE.css"
			}
		 else
			{
			cssFile = "CursorStyleSheetNS.css"
			}
		document.write("<link rel='stylesheet' type='text/css' href='" + cssFile + "'>");
		</script>
		<script language="javascript">
			//Ali
			var tip=new Array
			
			tip[0]='Date (Required, Color - Wheat)- Please Enter Date in MM/DD/YYYY Format'
			tip[1]='Name (Optional, Color - Lavendor) - Please Enter Your Name alphabets only'
			tip[2]='State (Required, Color - Wheat) - State you wish to visit'
			tip[3]='City (Required, Color - Wheat) - City you Wish to Visit<br>Ensure City Exists in State'
			tip[4]='Number (Optional, Color - Lavendor) - Number of Days you wish to Visit'
			tip[5]='Test (Conditionally Required, Color - Rosybrown) - Enter Money you have<br>if you have checked on the box' 

		function SetColor()
		{
				document.getElementById("TextBox1").className = 'RequiredField';
				document.getElementById("DropDownList1").className = 'RequiredField';
				document.getElementById("ListBox1").className = 'RequiredField';
				document.getElementById("TextBox3").className = 'OptionalField';
				
				document.getElementById("TextBox2").className = 'OptionalField';
				document.getElementById("TextBox4").className = 'MayRequired';
				
				//Another Way to Display tool tip Message is to use Window provided tool tip
				//IMPORTANT NOTE : tool tip (title property) is not available for listbox and dropdownbox control
				//Customization of message may not be possible.
				//----- document.getElementById("L1").title = tip[5] + '\r' +'Required - Name Ali maula';

				if (document.getElementById("Hidden1").value != "Clean") 
				{	
					//Error Messages returned by Server
					sErrMsg = document.getElementById("Hidden1").value
					var sErrMsgArray = new Array
					sErrMsgArray = sErrMsg.split('|')
					for (var i = 0; i < sErrMsgArray.length; i++)
					{
						var sMsgDataArray = new Array
						sMsgDataArray = sErrMsgArray[i].split(':')
						document.getElementById(sMsgDataArray[2]).className = 'ErrorInField';
					}				
				}
				document.getElementById("TextBox1").focus();
				document.getElementById("TextBox1").select();
		}

		function GetMsg(LabelID)
		{
			var tipMsg = new Array;	
			var retMsg = '';
			
			var msgStr = document.getElementById("Hidden1").value;
			tipMsg	= msgStr.split('|');
			for (var i = 0; i < tipMsg.length;i++)
				{
					var iMsg = new Array;
					var iStr = '';
					
					iStr = tipMsg[i];
					iMsg = iStr.split(':');
					if (iMsg[0] == LabelID)
						{
						 retMsg = retMsg + (iMsg[1] + '<br>');			
						}
				}
				if (retMsg.length > 0 )
					return '<Br><Br>Data Validation Message:<br>' + retMsg;
				else
					return '';
		}
		function FldOnFocus(fld)
		{
			var sErrMsg = document.getElementById("Hidden1").value;
			if (sErrMsg  == "Clean") 
				{
				fld.className = 'ActiveField';
				}
			else
				{
				if (sErrMsg.search(fld.name) > 0)
					{
					fld.className = 'ErrorInField';
					}
				else
					{
					fld.className = 'ActiveField';
					}
				}
		}
		function FldOnBlur(fld,fldType)
		{
			var sErrMsg = document.getElementById("Hidden1").value;
			
			if  (sErrMsg == 'Clean') 
				{
				fld.className = fldType;
				}
			else
				{
				if (sErrMsg.search(fld.name) > 0)
					{
					fld.className = 'ErrorInField';
					}
				else
					{
					fld.className = fldType;
					}
				}
		}
		</script>
	</HEAD>
	<body bgColor="#90c382" onload="SetColor();">
		<form id="Form1" method="post" runat="server">
			<br>
			<table cellSpacing="0" cellPadding="0" width="100%" border="1">
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td align="right">
						<asp:label id="L0" onmouseover="if (document.getElementById('Hidden1').value == 'Clean') {return escape(tip[0])} else {var msg; msg=GetMsg('L0'); return escape(tip[0]+msg)};"
							Runat="server" CssClass="CSSLabel">Date</asp:label>
					</td>
					<td align="left"><asp:textbox id="TextBox1" onblur="FldOnBlur(this,'RequiredField');" onfocus="FldOnFocus(this);"
							tabIndex="1" runat="server"></asp:textbox></td>
					<td align="right">
						<asp:label id="L1" onmouseover="if (document.getElementById('Hidden1').value == 'Clean') {return escape(tip[1])} else {var msg; msg=GetMsg('L1'); return escape(tip[1]+msg)};"
							Runat="server" CssClass="CSSLabel">Name</asp:label>
					</td>
					<td align="left">
						<asp:TextBox id="TextBox2" runat="server" Columns="18" onblur="FldOnBlur(this,'OptionalField');"
							onfocus="FldOnFocus(this);" TabIndex="2"></asp:TextBox></td>
				</tr>
				<tr>
					<td align="right">
						<asp:label id="L2" onmouseover="if (document.getElementById('Hidden1').value == 'Clean') {return escape(tip[2])} else {var msg; msg=GetMsg('L2'); return escape(tip[2]+msg)};"
							Runat="server" CssClass="CSSLabel">State</asp:label>
					</td>
					<td align="left"><asp:dropdownlist id="DropDownList1" onblur="FldOnBlur(this,'RequiredField');" onfocus="FldOnFocus(this);"
							tabIndex="3" runat="server">
							<asp:ListItem Value=""></asp:ListItem>
							<asp:ListItem Value="KS">KS</asp:ListItem>
							<asp:ListItem Value="MO">MO</asp:ListItem>
							<asp:ListItem Value="OK">OK</asp:ListItem>
							<asp:ListItem Value="CO">CO</asp:ListItem>
							<asp:ListItem Value="IL">IL</asp:ListItem>
							<asp:ListItem Value="TX">TX</asp:ListItem>
						</asp:dropdownlist></td>
					<td align="right">
						<asp:label id="L3" onmouseover="if (document.getElementById('Hidden1').value == 'Clean') {return escape(tip[4])} else {var msg; msg=GetMsg('L3'); return escape(tip[4]+msg)};"
							Runat="server" CssClass="CSSLabel">Number</asp:label>
					</td>
					<td align="left"><asp:textbox id="TextBox3" onblur="FldOnBlur(this,'OptionalField');" onfocus="FldOnFocus(this);"
							tabIndex="4" runat="server" MaxLength="15" Columns="18"></asp:textbox></td>
				<tr>
					<td vAlign="top" align="right">
						<asp:label id="L4" onmouseover="if (document.getElementById('Hidden1').value == 'Clean') {return escape(tip[3])} else {var msg; msg=GetMsg('L4'); return escape(tip[3]+msg)};"
							Runat="server" CssClass="CSSLabel">City</asp:label>
					</td>
					<td align="left"><asp:listbox id="ListBox1" onblur="FldOnBlur(this,'RequiredField');" onfocus="FldOnFocus(this);"
							tabIndex="5" runat="server" SelectionMode="Single">
							<asp:ListItem Value="kansas City">kansas City</asp:ListItem>
							<asp:ListItem Value="Tempa">Tempa</asp:ListItem>
							<asp:ListItem Value="St Louis">St Louis</asp:ListItem>
							<asp:ListItem Value="Tulsa">Tulsa</asp:ListItem>
							<asp:ListItem Value="Colorado Spring">Colorado Spring</asp:ListItem>
							<asp:ListItem></asp:ListItem>
						</asp:listbox></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td align="left"><asp:checkbox id="CheckBox1" onmouseover="return escape('Just Checking');" tabIndex="6" runat="server"
							Font-Size="14px" Text="Do You have Money"></asp:checkbox></td>
					<td align="right">
						<asp:label id="L5" onmouseover="if (document.getElementById('Hidden1').value == 'Clean') {return escape(tip[5])} else {var msg; msg=GetMsg('L5'); return escape(tip[5]+msg)};"
							Runat="server" CssClass="CSSLabel">Test</asp:label>
					</td>
					<td align="left">
						<asp:TextBox id="TextBox4" runat="server" Columns="18" onblur="FldOnBlur(this,'MayRequired');"
							onfocus="FldOnFocus(this);" TabIndex="7"></asp:TextBox></td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td><asp:button id="Button1" runat="server" Width="104px" Text="Validate"></asp:button></td>
				</tr>
			</table>
		</form>
		<INPUT id="Hidden1" type="hidden" value="Clean" name="Hidden1" runat="server">
		<script language="JavaScript" src="wz_tooltip.js" type="text/javascript"></script>
	</body>
</HTML>

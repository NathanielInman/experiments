<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="About.aspx.cs" Inherits="LoginForm.About" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1>This website was for Spring 2013 C# Programming Class.<%: Title %></h1>
    </hgroup>

    <article>
        <p>        
            It was created by Nathaniel Inman</p>

        <p>        
            It covers the core objects and requirements of the assignment</p>

        <p>        
            It will hopefully get an A. *crosses fingers*</p>
    </article>

    <aside>
        <h3>Other</h3>
        <p>        
            Here are other links.</p>
        <ul>
            <li><a runat="server" href="~/">Home</a></li>
            <li><a runat="server" href="~/About">About</a></li>
            <li><a runat="server" href="~/Contact">Contact</a></li>
        </ul>
    </aside>
</asp:Content>
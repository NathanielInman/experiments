<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="LoginForm._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %>This website was created for&nbsp; Jiaofei Zhongs Sprint 2013 Class</h1>
            </hgroup>
            <p>
                Jiaofei Zhongs official UCMO website is located at http://www.math-cs.ucmo.edu/~zhong/.</p>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <h3>This assignment accomplished the following:</h3>
    <ol class="round">
        <li class="one">
            <h5>Basic website design</h5>
            Nate created a website that includes a form.</li>
        <li class="two">
            <h5>Two textfield and two buttons.</h5>
            Naturally more than just two textfields and buttons were created. You can register a username and password as well as submit or reset in the forms.</li>
        <li class="three">
            <h5>Display Hello $name</h5>
            Upon logging in after creating an account, it will display hello, and then the persons name who registered.</li>
    </ol>
</asp:Content>

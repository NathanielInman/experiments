<%@ Page Title="Contact" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="LoginForm.Contact" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <hgroup class="title">
        <h1>This was created by Nate for Jiaofei Zhongs C# Programming Class</h1>
    </hgroup>

    <section class="contact">
        <header>
            <h3>Phone:</h3>
        </header>
        <p>
            <span class="label">Main:</span>
            660.543.8858
        </p>
    </section>

    <section class="contact">
        <header>
            <h3>Email:</h3>
        </header>
        <p>
            <span class="label">General:</span>
            <span><a href="mailto:Support@example.com">zhong@ucmo.edu</a></span></p>
    </section>

    <section class="contact">
        <header>
            <h3>Address:</h3>
        </header>
        <p>
            Jiaofei Zhong, Ph.D.</p>
        <p>
            Department of Mathematics and Computer Science</p>
        <p>
            University of Central Missouri</p>
        <p>
            Warrensburg, MO 64093</p>
    </section>
</asp:Content>
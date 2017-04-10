/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lab4RMI;

import java.rmi.AlreadyBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 *
 * @author Nathaniel Inman, UID: 700140843
 */
public class Server {
    private static final int PORT = 1099;
    private static Registry registry;
    public static void startRegistry() throws RemoteException{
        //registry=LocateRegistry.createRegistry(PORT);
        System.out.println("Set port to: " + PORT);
    }
    public static void registerObject(String name,Remote remoteObj) throws RemoteException,AlreadyBoundException{
        registry=LocateRegistry.createRegistry(PORT);
        registry.rebind(name,remoteObj);
        System.out.println("Registered: " + name + " -> " + remoteObj.getClass().getName() + "["+remoteObj+"]");
    }
    public static void main(String[] args) throws Exception{
        //forcing it to go localhost
        System.setProperty("java.rmi.server.hostname","localhost");
        //Beginning Registry
        startRegistry();
        registerObject(ServerInterface.class.getSimpleName(), new ServerImpl());
        Thread.sleep(5*60*1000);
    }
}
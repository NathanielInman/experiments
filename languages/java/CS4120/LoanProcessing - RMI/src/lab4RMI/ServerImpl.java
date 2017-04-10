/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lab4RMI;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 *
 * @author Nate
 */
public class ServerImpl extends UnicastRemoteObject implements ServerInterface{
    private static final long serialVersionUID = 1L;
    private int counter=0;
    public ServerImpl() throws RemoteException {super();}
    public synchronized Data incrementCounter(Data value) throws RemoteException{
        counter+=value.getValue();
        return new Data(counter);
    }
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lab4RMI;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 *
 * @author Nate
 */
public interface ServerInterface extends Remote {
    public Data incrementCounter(Data value) throws RemoteException;
}


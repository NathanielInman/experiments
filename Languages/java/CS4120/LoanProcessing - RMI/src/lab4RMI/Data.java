/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lab4RMI;

import java.io.Serializable;

/**
 *
 * @author Nate
 */
public class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    private int value;
    public Data(int value){
        this.value=value;
    }
    public int getValue(){
        return value;
    }
    public void setValue(int value){
        this.value=value;
    }
}

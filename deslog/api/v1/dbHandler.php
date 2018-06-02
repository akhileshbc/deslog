<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();    
    }
    /**
     * Delete a single record
     */
    public function deleteOneRecord($tabble_name, $id){
        $del_sql = "DELETE FROM ".$tabble_name." WHERE id = ".$id;
        $r = $this->conn->query($del_sql) or die($this->conn->error.__LINE__);
        if ($r) {
            //$new_remove_id = $this->conn->delete_id;
            return $r;
            } else {
            return NULL;
        }
 
    }


    /**
     * Fetching all record
     */
    public function getallRecord($query) {
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
        $results = array();
        while ($row = $r->fetch_assoc()) {
            $results[] = $row;
        
        }
        return $results;
//        while($r->fetch_assoc() != NULL){
//           $result []= $r->fetch_assoc(); 
//        }
//        return $result;    
    }
    /**eturn $result
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {
        
        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }
    public function updateTable($obj, $column_names, $table_name, $bannerid) {
        
        $c = (array) $obj;
        $id = $bannerid;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        //$query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        //mysql_query("UPDATE blogEntry SET content = '$udcontent', title = '$udtitle' WHERE id = $id");
        $query = "UPDATE ".$table_name." SET "."(".trim($columns,',').") = VALUES(".trim($values,',').")" ." WHERE id = '$id'" ;
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id_update = $this->conn->insert_id;
            return $new_row_id_update;
            } else {
            return NULL;
        }
    }
public function getSession(){
    if (!isset($_SESSION)) {
        session_start();
    }
    $sess = array();
    if(isset($_SESSION['uid']))
    {
        $sess["uid"] = $_SESSION['uid'];
        $sess["lastname"] = $_SESSION['lastname'];
        $sess["email"] = $_SESSION['email'];
    }
    else
    {
        $sess["uid"] = '';
        $sess["lastname"] = 'Guest';
        $sess["email"] = '';
    }
    return $sess;
}
public function destroySession(){
    if (!isset($_SESSION)) {
    session_start();
    }
    if(isSet($_SESSION['uid']))
    {
        unset($_SESSION['uid']);
        unset($_SESSION['lastname']);
        unset($_SESSION['email']);
        $info='info';
        if(isSet($_COOKIE[$info]))
        {
            setcookie ($info, '', time() - $cookie_time);
        }
        $msg="Logged Out Successfully...";
    }
    else
    {
        $msg = "Not logged in...";
    }
    return $msg;
}
 
}

?>

This is a recursive solution which has great efficiency. (implemented) (can be improved later)

Code Solution : 
```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

    boolean checkBST(TreeNode root, long min, long max)
    {
        if(root == null)
        {
            return true;
        }
        if(root.val <= min || root.val >= max)
        {
            return false;
        }
        
        return checkBST(root.left,min,root.val) && checkBST(root.right,root.val,max);
    }

    public boolean isValidBST(TreeNode root) {
        return checkBST(root,Long.MIN_VALUE,Long.MAX_VALUE);
    }
}
```

<img width="1431" alt="image" src="https://github.com/Udit-Kapoor/wysa/assets/68367301/92498164-16b8-4d9f-8dfc-5eec0a8fea00">


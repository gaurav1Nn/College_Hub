#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin>>t;
    while(t--){
        int n ;
        cin>>n;
        int peopleahead = 0;
        if(n==1 || n==3) cout<<1<<endl;
        else{
            peopleahead = (n-1)/2;
            if(peopleahead%2==0) cout<<peopleahead<<endl;
            else cout<<n-peopleahead<<endl;
        }
    }


}

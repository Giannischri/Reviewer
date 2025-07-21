import { Component, Input, OnInit } from '@angular/core';
import { CriterionNode } from "../../../shared/models/criteria-tree-node";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeFlattener, MatTreeFlatDataSource, MatTreeNestedDataSource} from "@angular/material/tree";
import {signOut} from "@angular/fire/auth";

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
  score?: number;
}

@Component({
  selector: 'app-criteria-tree',
  templateUrl: './criteria-tree.component.html',
  styleUrls: ['./criteria-tree.component.css']
})
export class CriteriaTreeComponent implements OnInit {

  @Input() postId!: string;

  criteria: CriterionNode[] = [
    { id: 'c1', name: 'Usability', description: 'Ease of use', postId: '', parentId: null, range: [1, 10], important: true, subjective: false, weight: 0.2, path: ['c1'] },
    { id: 'c2', name: 'Performance', description: 'System speed', postId: '', parentId: null, range: [1, 10], important: true, subjective: false, weight: 0.3, path: ['c2'] },
    { id: 'c3', name: 'Scalability', description: 'Ability to scale', postId: '', parentId: null, range: [1, 10], important: false, subjective: true, weight: 0.15, path: ['c3'] },
    { id: 'c4', name: 'Accessibility', description: 'Access for users', postId: '', parentId: 'c1', range: [1, 10], important: true, subjective: false, weight: 0.1, path: ['c1', 'c4'] },
    { id: 'c32', name: 'Accessibiliereresrty', description: 'Access for users', postId: '', parentId: 'c4', range: [1, 10], important: true, subjective: false, weight: 0.1, path: ['c1', 'c4','c32'] },

    { id: 'c5', name: 'Responsiveness', description: 'UI response time', postId: '', parentId: 'c2', range: [1, 10], important: true, subjective: false, weight: 0.2, path: ['c2', 'c5'] },
    { id: 'c6', name: 'Load Handling', description: 'Load at peak', postId: '', parentId: 'c3', range: [1, 10], important: false, subjective: true, weight: 0.1, path: ['c3', 'c6'] },
    { id: 'c7', name: 'Mobile Support', description: 'Mobile compatibility', postId: '', parentId: 'c1', range: [1, 10], important: false, subjective: true, weight: 0.1, path: ['c1', 'c7'] },
    { id: 'c8', name: 'Throughput', description: 'Transactions per second', postId: '', parentId: 'c2', range: [1, 10], important: true, subjective: false, weight: 0.15, path: ['c2', 'c8'] },
    { id: 'c9', name: 'Maintainability', description: 'Ease of maintenance', postId: '', parentId: null, range: [1, 10], important: true, subjective: true, weight: 0.1, path: ['c9'] },
    { id: 'c10', name: 'Documentation', description: 'Quality of docs', postId: '', parentId: 'c9', range: [1, 10], important: true, subjective: true, weight: 0.05, path: ['c9', 'c10'] },
    { id: 'c11', name: 'Security', description: 'Protection level', postId: '', parentId: null, range: [1, 10], important: true, subjective: false, weight: 0.2, path: ['c11'] },
    { id: 'c12', name: 'Encryption', description: 'Data encryption strength', postId: '', parentId: 'c11', range: [1, 10], important: true, subjective: false, weight: 0.1, path: ['c11', 'c12'] },
    { id: 'c13', name: 'Auditability', description: 'Audit trails', postId: '', parentId: 'c11', range: [1, 10], important: false, subjective: true, weight: 0.1, path: ['c11', 'c13'] },
    { id: 'c14', name: 'Cost Efficiency', description: 'Cost vs benefits', postId: '', parentId: null, range: [1, 10], important: false, subjective: true, weight: 0.1, path: ['c14'] },
    { id: 'c15', name: 'Integration', description: 'Integration ease', postId: '', parentId: null, range: [1, 10], important: true, subjective: false, weight: 0.15, path: ['c15'] },
    { id: 'c16', name: 'API Support', description: 'Available APIs', postId: '', parentId: 'c15', range: [1, 10], important: true, subjective: false, weight: 0.1, path: ['c15', 'c16'] },
    { id: 'c17', name: 'Customization', description: 'Customizable features', postId: '', parentId: 'c15', range: [1, 10], important: false, subjective: true, weight: 0.05, path: ['c15', 'c17'] },
    { id: 'c18', name: 'Reliability', description: 'Uptime and errors', postId: '', parentId: null, range: [1, 10], important: true, subjective: false, weight: 0.2, path: ['c18'] },
    { id: 'c19', name: 'Backup', description: 'Backup procedures', postId: '', parentId: 'c18', range: [1, 10], important: true, subjective: false, weight: 0.1, path: ['c18', 'c19'] },
    { id: 'c20', name: 'Failover', description: 'Failover mechanisms', postId: '', parentId: 'c18', range: [1, 10], important: true, subjective: false, weight: 0.1, path: ['c18', 'c20'] },
  ];

  treeControl = new NestedTreeControl<CriterionNode>(node => node.children);
  treeSource = new MatTreeNestedDataSource<CriterionNode>();


  ngOnInit(): void {
    this.criteria.forEach(c => c.postId = this.postId);
    const treeData = this.buildTree(this.criteria);
    this.treeSource.data = treeData;
    console.log(treeData)
  }

  hasChild = (_: number, node: CriterionNode) =>
    !!node.children && node.children.length > 0;

  buildTree(flatList: CriterionNode[]): CriterionNode[] {
    const idMap = new Map<string, CriterionNode>();

    flatList.forEach(item => {
      item.children = [];
      idMap.set(item.id, item);
    });

    const rootNodes: CriterionNode[] = [];

    flatList.forEach(node => {
      if (node.parentId) {
        const parent = idMap.get(node.parentId);
        parent?.children?.push(node);
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  }

  onScoreChange(id: string, newScore: number): void {
    const crit = this.criteria.find(c => c.id === id);
    if (crit) {
      crit.score = newScore;
    }
  }
}

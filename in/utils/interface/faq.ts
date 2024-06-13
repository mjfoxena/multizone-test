interface SubHead {
  id: string;
  miniHead: string;
}

export interface IFAQ {
  head: string;
  id: string;
  subHead: SubHead[];
}

interface QsAndDes {
  description: string;
  qs: string;
}

interface SubHeadWithQsAns {
  id: string;
  miniHead: string;
  qsAndDes: QsAndDes[];
}

export interface FAQWithQsAns {
  head: string;
  id: string;
  subHead: SubHeadWithQsAns[];
}
